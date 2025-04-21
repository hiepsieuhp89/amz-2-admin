import {
  Box,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  InputAdornment,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useGetMessages, useSendMessage, useMarkAsRead, useDeleteMessage } from "@/hooks/admin-chat";
import { useState, useEffect, useRef } from "react";
import { IconSearch, IconCheck, IconTrash, IconPaperclip, IconShoppingCart, IconX, IconPhoto, IconExternalLink } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useGetAllShopProducts, useGetShopProductById } from "@/hooks/shop-products";
import { useGetProductById } from "@/hooks/product";
import { useUploadImage } from "@/hooks/image";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ShopProduct {
  id: string;
  productId?: string;
  product?: {
    name?: string;
    price?: number | string;
    imageUrls?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  allUsers: any[];
  shop: any;
}

// Message component to handle individual message rendering and product data fetching
const MessageItem = ({ msg, handleMarkAsRead, handleDeleteMessage }: { 
  msg: any;
  handleMarkAsRead: (id: string) => void;
  handleDeleteMessage: (id: string) => void;
}) => {
  const router = useRouter();
  const isUserMessage = msg.senderRole === "user";
  const senderInfo = isUserMessage
    ? msg.user?.fullName || "Người dùng"
    : msg.shop?.shopName || "Shop";

  // Fetch product details if shopProductId exists but full product data is missing
  const productId = msg.shopProduct?.productId;
  const productQueryEnabled = !!productId && !msg.shopProduct?.product;
  const { data: productData, isLoading: isLoadingProduct } = useGetProductById(
    productQueryEnabled ? productId : ""
  );

  const handleProductClick = () => {
    if (productId) {
      router.push(`/admin/products/${productId}`);
    }
  };

  const getFirstImage = (imageUrls: string[] | undefined): string => {
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return 'https://placehold.co/400x400/png';
    }
    return imageUrls[0].startsWith('http') ? imageUrls[0] : `http://localhost:3000${imageUrls[0]}`;
  };

  return (
    <Box
      mb={2}
      className={isUserMessage ? "ml-auto" : ""}
      style={{ 
        maxWidth: msg.message?.length > 50 ? "70%" : "fit-content",
        marginLeft: isUserMessage ? "auto" : "0"
      }}
    >
      <Box
        bgcolor={isUserMessage ? "#e3f2fd" : "#f5f5f5"}
        p={1.5}
        borderRadius={2}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
            {senderInfo}
          </Typography>
          <Box display="flex" gap={1}>
            <IconCheck
              size={20}
              style={{ cursor: "pointer", color: "#4caf50" }}
              onClick={() => handleMarkAsRead(msg.id)}
            />
            <IconTrash
              size={20}
              style={{ cursor: "pointer", color: "#f44336" }}
              onClick={() => handleDeleteMessage(msg.id)}
            />
          </Box>
        </Box>
        
        {msg.message && (
          <Typography>{msg.message}</Typography>
        )}
        
        {/* Display attached images */}
        {msg.imageUrls && msg.imageUrls.length > 0 && (
          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            {msg.imageUrls.map((url: string, idx: number) => (
              <Box 
                key={idx} 
                sx={{ 
                  position: 'relative',
                  width: msg.imageUrls.length > 1 ? '120px' : '200px',
                  height: msg.imageUrls.length > 1 ? '120px' : '200px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0'
                }}
              >
                <Image 
                  src={url.startsWith('http') ? url : `http://localhost:3000${url}`}
                  alt="Attached image" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        )}
        
        {/* Display attached product */}
        {msg.shopProductId && (
          <Box 
            mt={1} 
            p={1} 
            bgcolor={isUserMessage ? "#d0e8fd" : "#e9e9e9"}
            borderRadius={1}
            display="flex"
            gap={2}
          >
            {productQueryEnabled && isLoadingProduct ? (
              <Box sx={{ display: "flex", width: "100%", justifyContent: "center", p: 1 }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <>
                <Box sx={{ width: '60px', height: '60px', position: 'relative', flexShrink: 0, bgcolor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {productData?.data?.imageUrls ? (
                    <Image
                      src={getFirstImage(productData.data.imageUrls)}
                      alt={productData.data.name || "Product image"}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <IconShoppingCart size={24} color="#999" />
                  )}
                </Box>
                <Box flex={1}>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={500}
                    onClick={handleProductClick}
                    sx={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center',
                      '&:hover': { 
                        color: '#2196f3', 
                        textDecoration: 'underline' 
                      } 
                    }}
                  >
                    {productData?.data?.name || "Sản phẩm đính kèm"}
                    <IconExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {productData?.data?.price ? `$${productData.data.price}` : "Xem chi tiết sản phẩm"}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        )}
        
        <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
          {new Date(msg.createdAt).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default function ChatDialog({
  open,
  onClose,
  userId: selectedShopId,
  allUsers,
  shop,
}: ChatDialogProps) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const previousMessagesCount = useRef(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: messages, isLoading, refetch } = useGetMessages(
    selectedUserId || "",
    selectedShopId || ""
  );
  
  const sendMessageMutation = useSendMessage();
  const markAsReadMutation = useMarkAsRead();
  const deleteMessageMutation = useDeleteMessage();
  const uploadImageMutation = useUploadImage();

  // Fetch products if product selector is shown
  const { data: productsData, isLoading: isLoadingProducts } = useGetAllShopProducts({
    shopId: selectedShopId || "",
    page: 1,
    take: 10,
    search: searchProduct,
  });

  // Add fetch for product details when needed
  const shopProductDetailsEnabled = !!selectedProduct?.id && !selectedProduct?.product;
  const { data: productDetailsData } = useGetShopProductById(
    shopProductDetailsEnabled ? selectedProduct?.id : ""
  );

  // Fetch product details for the selected product
  const productDetailsEnabled = !!selectedProduct?.productId && !selectedProduct?.product?.name;
  const { data: selectedProductData } = useGetProductById(
    (productDetailsEnabled && selectedProduct?.productId ? selectedProduct.productId : "") as string
  );

  // Update product data when details are fetched
  useEffect(() => {
    if (productDetailsData?.data && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        product: productDetailsData.data?.product
      });
    }
  }, [productDetailsData, selectedProduct]);

  // Update product data when product details are fetched
  useEffect(() => {
    if (selectedProductData?.data && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        product: {
          name: selectedProductData.data.name,
          price: selectedProductData.data.price,
          imageUrls: selectedProductData.data.imageUrls
        }
      });
    }
  }, [selectedProductData, selectedProduct]);

  // Thêm interval để fetch tin nhắn mới
  useEffect(() => {
    if (!open || !selectedUserId || !selectedShopId) return;

    const interval = setInterval(() => {
      refetch();
    }, 20000); // 20 giây

    return () => clearInterval(interval);
  }, [open, selectedUserId, selectedShopId, refetch]);

  // Kiểm tra tin nhắn mới và hiển thị thông báo
  useEffect(() => {
    if (!messages?.data || isLoading) return;

    const currentMessagesCount = messages.data.length;
    if (previousMessagesCount.current > 0 && 
        currentMessagesCount > previousMessagesCount.current) {
      const newMessagesCount = currentMessagesCount - previousMessagesCount.current;
      toast.info(`Bạn có ${newMessagesCount} tin nhắn mới`);
    }

    previousMessagesCount.current = currentMessagesCount;
  }, [messages, isLoading]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newURLs = newFiles.map(file => URL.createObjectURL(file));
      setImageURLs((prev) => [...prev, ...newURLs]);
    }
  };

  // Handle image remove
  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imageURLs[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageURLs(prev => prev.filter((_, i) => i !== index));
  };

  // Handle product selection
  const handleSelectProduct = (product: ShopProduct) => {
    setSelectedProduct(product);
    setShowProductSelector(false);
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.invitationCode?.toLowerCase().includes(searchLower) ||
      user.referralCode?.toLowerCase().includes(searchLower) ||
      [user.address, user.ward, user.district, user.city]
        .filter(Boolean)
        .join(", ")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  const handleSendMessage = async () => {
    if (!selectedUserId || !selectedShopId || (!message && images.length === 0 && !selectedProduct)) return;

    try {
      // First upload all images if any
      let uploadedImageUrls: string[] = [];
      
      if (images.length > 0) {
        toast.info("Đang tải ảnh lên...", { autoClose: false, toastId: "upload-images" });
        
        // Upload all images in parallel
        const uploadPromises = images.map(file => 
          uploadImageMutation.mutateAsync({
            file,
            isPublic: true,
            description: `Chat image from ${selectedUserId} to ${selectedShopId}`
          })
        );
        
        const results = await Promise.all(uploadPromises);
        uploadedImageUrls = results.map(result => result.data.url);
        
        toast.update("upload-images", { 
          render: "Tải ảnh thành công!",
          autoClose: 2000
        });
      }

      await sendMessageMutation.mutateAsync({
        userId: selectedUserId,
        shopId: selectedShopId,
        message,
        imageUrls: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
        shopProductId: selectedProduct?.id || undefined,
      });
      
      setMessage("");
      setImages([]);
      setImageURLs([]);
      setSelectedProduct(null);
      toast.success("Đã gửi tin nhắn thành công");
      
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Không thể gửi tin nhắn. Vui lòng thử lại.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsReadMutation.mutateAsync(messageId);
      refetch();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessageMutation.mutateAsync(messageId);
      refetch();
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const getFirstImage = (imageUrls: string[] | undefined): string => {
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return 'https://placehold.co/400x400/png';
    }
    return imageUrls[0].startsWith('http') ? imageUrls[0] : `http://localhost:3000${imageUrls[0]}`;
  };

  // Inside the component, add a handler for product click in the selectedProduct preview:
  const handleProductClick = () => {
    if (selectedProduct?.productId) {
      router.push(`/admin/products/${selectedProduct.productId}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <Box display="flex" height="600px">
          {/* Sidebar */}
          <Box
            width="300px"
            borderRight="1px solid #e0e0e0"
            display="flex"
            flexDirection="column"
          >
            <Box p={2}>
              <Typography variant="h6" mb={2}>
                Chọn người dùng
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Tìm theo email, SĐT, mã, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box flex={1} overflow="auto">
              <List>
                {filteredUsers.map((user) => (
                  <ListItem key={user.id} disablePadding>
                    <ListItemButton
                      selected={selectedUserId === user.id}
                      onClick={() => {
                        setSelectedUserId(user.id);
                      }}
                    >
                      <ListItemText
                        primary={user.fullName || user.username}
                        secondary={
                          <Box component="span" display="block">
                            <Box component="span" display="block">
                              {user.email}
                            </Box>
                            <Box component="span" display="block">
                              {user.phone}
                            </Box>
                            <Box component="span" display="block">
                              {[
                                user.address,
                                user.ward,
                                user.district,
                                user.city,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </Box>
                          </Box>
                        }
                        secondaryTypographyProps={{ component: "div" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Chat Area */}
          <Box flex={1} display="flex" flexDirection="column">
            {/* Chat Header */}
            <Box p={2} borderBottom="1px solid #e0e0e0">
              <Typography variant="h6">
                Gửi tin nhắn từ{" "}
                {selectedUserId
                  ? allUsers.find((u) => u.id === selectedUserId)?.fullName ||
                    "người dùng"
                  : "..."}{" "}
                đến {shop?.shopName || "shop"}
              </Typography>
            </Box>

            {/* Messages */}
            <Box flex={1} p={2} overflow="auto">
              {isLoading ? (
                <Typography>Đang tải tin nhắn...</Typography>
              ) : (
                messages?.data?.map((msg: any) => (
                  <MessageItem 
                    key={msg.id} 
                    msg={msg} 
                    handleMarkAsRead={handleMarkAsRead} 
                    handleDeleteMessage={handleDeleteMessage} 
                  />
                ))
              )}
            </Box>

            {/* Selected product preview */}
            {selectedProduct && (
              <Box p={2} borderTop="1px solid #e0e0e0" bgcolor="#f9f9f9">
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="subtitle2">Sản phẩm đính kèm:</Typography>
                  <Box display="flex" alignItems="center" gap={1} flex={1} p={1} border="1px solid #e0e0e0" borderRadius={1} bgcolor="white">
                    <Box sx={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0, bgcolor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {selectedProduct.product?.imageUrls ? (
                        <Image
                          src={getFirstImage(selectedProduct.product?.imageUrls)}
                          alt={selectedProduct.product?.name || "Product"}
                          fill
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        <IconShoppingCart size={20} color="#999" />
                      )}
                    </Box>
                    <Typography 
                      variant="body2" 
                      noWrap 
                      sx={{ 
                        flex: 1, 
                        cursor: selectedProduct.productId ? 'pointer' : 'default',
                        '&:hover': selectedProduct.productId ? { 
                          color: '#2196f3', 
                          textDecoration: 'underline' 
                        } : {}
                      }}
                      onClick={handleProductClick}
                    >
                      {selectedProduct.product?.name || "Sản phẩm đã chọn"}
                      {selectedProduct.productId && (
                        <IconExternalLink size={14} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
                      )}
                    </Typography>
                    <IconButton size="small" onClick={() => setSelectedProduct(null)}>
                      <IconX size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Image previews */}
            {imageURLs.length > 0 && (
              <Box p={2} borderTop="1px solid #e0e0e0" bgcolor="#f9f9f9">
                <Typography variant="subtitle2" mb={1}>Hình ảnh đính kèm:</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {imageURLs.map((url, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <Image 
                        src={url} 
                        alt={`Preview ${index}`} 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <IconButton 
                        size="small" 
                        sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          right: 0, 
                          bgcolor: 'rgba(255,255,255,0.8)', 
                          p: '2px',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <IconX size={12} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Product selector */}
            {showProductSelector && selectedShopId && (
              <Paper 
                elevation={3} 
                sx={{ 
                  position: 'absolute', 
                  bottom: '80px', 
                  right: '24px', 
                  width: '400px',
                  maxHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 10,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <Box p={2} borderBottom="1px solid #e0e0e0" display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={500}>Chọn sản phẩm</Typography>
                  <IconButton size="small" onClick={() => setShowProductSelector(false)}>
                    <IconX size={18} />
                  </IconButton>
                </Box>
                
                <Box p={2}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={18} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                <Box overflow="auto" flex={1} maxHeight="300px">
                  {isLoadingProducts ? (
                    <Box display="flex" justifyContent="center" p={3}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <List disablePadding>
                      {productsData?.data?.data?.length === 0 ? (
                        <Box p={3} textAlign="center">
                          <Typography color="text.secondary">Không tìm thấy sản phẩm</Typography>
                        </Box>
                      ) : (
                        productsData?.data?.data?.map((item: any) => (
                          <ListItem key={item.id} disablePadding divider>
                            <ListItemButton onClick={() => handleSelectProduct(item)}>
                              <Box display="flex" gap={2} width="100%">
                                <Box sx={{ width: '50px', height: '50px', position: 'relative', flexShrink: 0 }}>
                                  <Image
                                    src={getFirstImage(item.product?.imageUrls)}
                                    alt={item.product?.name || "Product"}
                                    fill
                                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                                  />
                                </Box>
                                <Box flex={1}>
                                  <Typography variant="body2" fontWeight={500}>
                                    {item.product?.name || "Sản phẩm"}
                                  </Typography>
                                  <Box display="flex" gap={2}>
                                    <Typography variant="caption" color="success.main">
                                      ${item.salePrice || item.price || 0}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Còn {item.product?.stock || 0} sản phẩm
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </ListItemButton>
                          </ListItem>
                        ))
                      )}
                    </List>
                  )}
                </Box>
              </Paper>
            )}

            {/* Message Input */}
            <Box p={2} borderTop="1px solid #e0e0e0">
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box display="flex" gap={0.5}>
                          <IconButton 
                            size="small" 
                            onClick={() => fileInputRef.current?.click()}
                            sx={{ color: '#1976d2' }}
                          >
                            <IconPaperclip size={20} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => setShowProductSelector(prev => !prev)}
                            sx={{ color: selectedProduct ? 'success.main' : 'inherit' }}
                          >
                            <IconShoppingCart size={20} />
                          </IconButton>
                          <input
                            type="file"
                            multiple
                            hidden
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  variant="contained"
                  color="primary"
                  disabled={!selectedUserId || (!message && images.length === 0 && !selectedProduct)}
                  sx={{ minWidth: '80px' }}
                >
                  Gửi
                </Button>
              </Box>
              
              <Box display="flex" gap={1} mt={1}>
                {images.length > 0 && (
                  <Button 
                    size="small" 
                    startIcon={<IconPhoto size={16} />}
                    variant="text"
                    color="primary"
                  >
                    {images.length} ảnh
                  </Button>
                )}
                
                {selectedProduct && (
                  <Button
                    size="small"
                    startIcon={<IconShoppingCart size={16} />}
                    variant="text"
                    color="success"
                  >
                    1 sản phẩm
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
