"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
  Card,
  CardContent,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconStar,
  IconUpload,
  IconX,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useRouter, useParams } from "next/navigation";
import { message } from "antd";
import { format } from "date-fns";
import { Lightbox } from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Autocomplete } from "@mui/material";
import { debounce } from "lodash";

import {
  useCreateProductReview,
  useDeleteProductReview,
  useGetAllProductReviews,
} from "@/hooks/product-review";
import { useGetProductById } from "@/hooks/product";
import { useUploadImage } from "@/hooks/image";
import { sendGet } from "@/api/apiClient";
import DataTable from "@/components/DataTable";
import { ICreateProductReview } from "@/api/services/product-review.service";

interface ProductWithRating {
  id: string;
  name: string;
  imageUrls?: string[];
  avgRating?: number;
  [key: string]: any;
}

interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: {
    id: string;
    email: string;
  };
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
}

const ProductReviewsPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddReviewDialog, setShowAddReviewDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [validUsers, setValidUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    content: "",
    images: [] as File[],
    imagePreviews: [] as string[],
  });
  const [isLoadingValidUsers, setIsLoadingValidUsers] = useState(false);

  // Fetch valid users (users with 'user' role)
  const fetchValidUsers = async (search: string) => {
    setIsLoadingValidUsers(true);
    try {
      const response = await sendGet("/admin/fake-orders/valid-users", {
        search: search || "",
      });
      setValidUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching valid users:", error);
    } finally {
      setIsLoadingValidUsers(false);
    }
  };

  const debouncedUserSearch = debounce((searchString: string) => {
    fetchValidUsers(searchString);
  }, 300);

  useEffect(() => {
    fetchValidUsers("");
  }, []);

  // Queries and Mutations
  const { data: productData, isLoading: isLoadingProduct } = useGetProductById(productId);
  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetAllProductReviews({
    page,
    take: rowsPerPage,
    search: searchTerm,
    productId,
  });
  const createReviewMutation = useCreateProductReview();
  const deleteReviewMutation = useDeleteProductReview();
  const uploadImageMutation = useUploadImage();

  const handleGoBack = () => {
    router.push(`/admin/products/${productId}`);
  };

  const handleAddReview = () => {
    setShowAddReviewDialog(true);
  };

  const handleCloseAddReviewDialog = () => {
    setShowAddReviewDialog(false);
    setReviewData({
      rating: 5,
      content: "",
      images: [],
      imagePreviews: [],
    });
    setSelectedUser(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setReviewData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));

      // Create image previews
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setReviewData((prev) => ({
            ...prev,
            imagePreviews: [...prev.imagePreviews, event.target?.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setReviewData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setLightboxOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setReviewToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteReviewMutation.mutateAsync(reviewToDelete);
      message.success("Đánh giá đã được xóa thành công!");
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      message.error("Không thể xóa đánh giá. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedUser) {
      message.error("Vui lòng chọn một người dùng!");
      return;
    }

    try {
      // Upload images if available
      let imageUrls: string[] = [];
      if (reviewData.images.length > 0) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" });

        try {
          // Upload each image
          for (const file of reviewData.images) {
            const uploadResult = await uploadImageMutation.mutateAsync({
              file: file,
              isPublic: true,
              description: `Hình ảnh đánh giá sản phẩm: ${productData?.data?.name || productId}`,
            });

            imageUrls.push(uploadResult.data.url);
          }

          message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" });
        } catch (error) {
          message.error({ content: "Lỗi khi tải hình ảnh!", key: "uploadImage" });
          console.error("Image upload error:", error);
          return;
        }
      }

      // Create review
      message.loading({ content: "Đang tạo đánh giá...", key: "createReview" });
      
      const payload: ICreateProductReview = {
        productId,
        userId: selectedUser.id,
        rating: reviewData.rating,
        content: reviewData.content,
        images: imageUrls,
      };
      
      await createReviewMutation.mutateAsync(payload);
      
      message.success({ content: "Đánh giá đã được tạo thành công!", key: "createReview" });
      handleCloseAddReviewDialog();
      refetch();
    } catch (error) {
      message.error({ content: "Không thể tạo đánh giá. Vui lòng thử lại.", key: "createReview" });
      console.error("Review creation error:", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  const reviewsList = reviewsData?.data?.data || [];
  const pagination = reviewsData?.data?.meta || {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  const columns = [
    { key: "user", label: "Người dùng" },
    { key: "rating", label: "Đánh giá" },
    { key: "content", label: "Nội dung" },
    { key: "images", label: "Hình ảnh" },
    { key: "createdAt", label: "Ngày tạo" },
    { key: "actions", label: "Thao tác" },
  ];

  const renderRow = (review: Review, index: number) => (
    <tr
      key={review.id}
      className={`border-b ${index % 2 !== 1 ? "bg-gray-50" : "bg-white"}`}
    >
      <td className="px-5 py-3">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{ bgcolor: review.user?.email ? "primary.main" : "grey.500", width: 36, height: 36 }}
          >
            {review.user?.email?.charAt(0)?.toUpperCase() || <IconUser size={20} />}
          </Avatar>
          <Box>
            <Typography variant="body2">{review.user?.email || "-"}</Typography>
            <Typography variant="caption" color="textSecondary">
              ID: {review.user?.id || "-"}
            </Typography>
          </Box>
        </Box>
      </td>
      <td className="px-5 py-3">
        <Rating value={review.rating} readOnly precision={0.5} />
      </td>
      <td className="px-5 py-3">
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px",
          }}
        >
          {review.content || "N/A"}
        </Typography>
      </td>
      <td className="px-5 py-3">
        {review.images && review.images.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            {review.images.slice(0, 3).map((url: string, i: number) => (
              <Box
                key={i}
                component="img"
                src={url}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(url)}
              />
            ))}
            {review.images.length > 3 && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  bgcolor: "rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="caption">+{review.images.length - 3}</Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            N/A
          </Typography>
        )}
      </td>
      <td className="px-5 py-3">{formatDate(review.createdAt)}</td>
      <td className="px-5 py-3">
        <IconButton
          onClick={() => openDeleteDialog(review.id)}
          size="small"
          className="bg-red-100"
          color="error"
        >
          <IconTrash size={18} />
        </IconButton>
      </td>
    </tr>
  );

  const product = productData?.data as ProductWithRating;

  if (isLoadingProduct) {
    return (
      <Box className="flex items-center justify-center w-full min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconStar size={36} className="text-main-golden-orange" />
          </Box>
          <Typography
            variant="h3"
            className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue"
          >
            Đánh giá sản phẩm
          </Typography>
          <Typography variant="subtitle1" className="text-center text-gray-500">
            {product?.name || "Loading..."}
          </Typography>
        </Box>
      </Box>

      <Box className="p-6">
        <Box className="flex items-center justify-between mb-6">
          <Button
            variant="outlined"
            startIcon={<IconArrowLeft size={18} />}
            onClick={handleGoBack}
          >
            Quay lại sản phẩm
          </Button>
          <Button
            variant="contained"
            className="!bg-main-golden-orange !border-main-golden-orange !text-white"
            startIcon={<IconPlus size={18} />}
            onClick={handleAddReview}
          >
            Thêm đánh giá mới
          </Button>
        </Box>

        <Card className="mb-6 shadow">
          <CardContent>
            <Box className="flex items-center mb-4 space-x-4">
              <Box
                component="img"
                src={product?.imageUrls?.[0] || "https://via.placeholder.com/150"}
                alt={product?.name}
                sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px" }}
              />
              <Box>
                <Typography variant="h6">{product?.name}</Typography>
                {/* <Box className="flex items-center mt-1">
                  <Rating value={product?.avgRating || 0} readOnly precision={0.5} />
                  <Typography variant="body2" className="ml-2">
                    {product?.avgRating ? `${product.avgRating.toFixed(1)} / 5` : "Chưa có đánh giá"}
                  </Typography>
                </Box> */}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Paper className="mb-6">
          <Box className="p-4">
            <TextField
              size="small"
              placeholder="Tìm kiếm đánh giá..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <DataTable
            columns={columns}
            data={reviewsList}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={setPage}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setPage(1);
            }}
            renderRow={renderRow}
            emptyMessage="Không tìm thấy đánh giá nào"
          />
        </Paper>
      </Box>

      {/* Add Review Dialog */}
      <Dialog
        open={showAddReviewDialog}
        onClose={handleCloseAddReviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Thêm đánh giá mới</DialogTitle>
        <DialogContent>
          <Box className="flex flex-col gap-4 mt-2">
            <Autocomplete
              options={validUsers}
              loading={isLoadingValidUsers}
              getOptionLabel={(option) => option.email || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={selectedUser}
              onChange={(_, newValue) => {
                setSelectedUser(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                debouncedUserSearch(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn người dùng"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <IconSearch size={20} />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {isLoadingValidUsers ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                    >
                      {option.email?.charAt(0)?.toUpperCase() || <IconUser size={16} />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{option.email}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        ID: {option.id}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              )}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Đánh giá
              </Typography>
              <Rating
                value={reviewData.rating}
                onChange={(_, newValue) => {
                  setReviewData((prev) => ({
                    ...prev,
                    rating: newValue || 5,
                  }));
                }}
                precision={1}
                size="large"
              />
            </Box>

            <TextField
              label="Nội dung đánh giá"
              multiline
              rows={4}
              value={reviewData.content}
              onChange={(e) =>
                setReviewData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              fullWidth
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Hình ảnh đánh giá
              </Typography>

              {reviewData.imagePreviews.length > 0 ? (
                <Box  className="mb-3">
                  {reviewData.imagePreviews.map((preview, index) => (
                    <Box key={index}>
                      <Box className="relative rounded aspect-square">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="object-cover w-full h-full rounded"
                        />
                        <IconButton
                          onClick={() => removeImage(index)}
                          className="absolute p-1 bg-red-500 rounded-full top-2 right-2"
                          size="small"
                        >
                          <IconX size={16} color="white" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}

              <label>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  className="mt-2"
                >
                  Tải ảnh lên
                </Button>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseAddReviewDialog}>Hủy</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            className="!bg-main-golden-orange !text-white"
            disabled={createReviewMutation.isPending || uploadImageMutation.isPending}
          >
            {createReviewMutation.isPending || uploadImageMutation.isPending ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Thêm đánh giá"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle>Xác nhận xóa đánh giá</DialogTitle>
        <DialogContent>
          <Typography className="text-gray-600">
            Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            className="!bg-red-500 !text-white"
            disabled={deleteReviewMutation.isPending}
          >
            {deleteReviewMutation.isPending ? (
              <div className="flex items-center gap-2 !text-white">
                <CircularProgress size={16} className="!text-white" />
                Đang xóa...
              </div>
            ) : (
              <span className="!text-white">Xóa</span>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lightbox for viewing images */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: currentImage }]}
        plugins={[Zoom, Download]}
      />
    </>
  );
};

export default ProductReviewsPage; 