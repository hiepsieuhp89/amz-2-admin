"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { IconArrowLeft, IconEdit, IconPlus, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { message } from "antd"
import { useGetProductById, useUpdateProduct, useDeleteProduct } from '@/hooks/product';
import { useUploadImage } from '@/hooks/image';

// Define the form data interface to match our API structure
interface ProductFormData {
  name: string;
  slug: string;
  price: string;
  salePrice: string; // Changed from compareAtPrice to match API
  description: string;
  stock: string; // Changed from quantity to match API
  categoryId: string;
  imageUrl: string | null; // Changed from image to match API
  image: File | null; // For file upload handling
  imagePreview: string | null; // For preview
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const productId = params.id;
  
  // Use the hooks directly
  const { data: productData, isLoading, error } = useGetProductById(productId);
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const uploadImageMutation = useUploadImage();

  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    price: '',
    salePrice: '',
    description: '',
    stock: '',
    categoryId: '',
    imageUrl: null,
    image: null,
    imagePreview: null,
  });

  // Load product data when available
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setFormData({
        name: product.name || '',
        slug: '', // API doesn't return slug
        price: product.price || '',
        salePrice: product.salePrice || '',
        description: product.description || '',
        stock: product.stock?.toString() || '',
        categoryId: product.category?.id || '',
        imageUrl: product.imageUrl || null,
        image: null,
        imagePreview: product.imageUrl || null,
      });
    }
  }, [productData]);

  const handleBack = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let updatedData: any = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        stock: parseInt(formData.stock, 10),
        categoryId: formData.categoryId || undefined
      };
      
      if (formData.image) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" });
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: formData.image,
          isPublic: true,
          description: `Hình ảnh cho sản phẩm: ${formData.name}`
        });
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" });
        
        // Add the image URL to the update payload
        updatedData.imageUrl = uploadResult.data.url;
      }
      
      await updateProductMutation.mutateAsync({
        id: productId,
        payload: updatedData,
      });
      
      message.success("Sản phẩm đã được cập nhật!");
      setIsEditing(false);
    } catch (error) {
      message.error("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      message.success("Sản phẩm đã được xóa thành công!");
      router.push('/admin/products');
    } catch (error) {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
      console.error(error);
    }
  };

  if (isLoading || updateProductMutation.isPending || deleteProductMutation.isPending) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    );
  }

  if (error || !productData?.data) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin sản phẩm
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Sản phẩm không tồn tại hoặc đã bị xóa"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="text-gray-300 border-gray-500 hover:bg-gray-700"
        >
          Quay lại danh sách
        </Button>
      </Box>
    );
  }

  const product = productData.data;

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="mr-4"
        >
          Quay lại
        </Button>
        <Typography
          fontSize={18}
          fontWeight={700}
          variant="h5"
          className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
        >
          Chi tiết sản phẩm
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Tên sản phẩm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                helperText="Để trống để tự động tạo từ tên sản phẩm"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Giá khuyến mãi"
                name="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Số lượng"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="ID Danh mục"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Mô tả chi tiết"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                Hình ảnh sản phẩm
              </Typography>
              {formData.imagePreview ? (
                <div className="relative flex-1 w-full h-32 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={formData.imagePreview}
                    alt="Product preview"
                    className="object-cover w-full h-full"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: null, imagePreview: null }))}
                      className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <IconX size={16} color="white" />
                    </button>
                  )}
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center w-full h-32 transition-colors border border-gray-500 border-dashed !rounded-lg ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload hình ảnh</p>
                  </div>
                  {isEditing && <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          image: file,
                          imagePreview: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />}
                </label>
              )}
            </Grid>
          </Grid>
          
          {isEditing && (
            <Box className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateProductMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updateProductMutation.isPending ? (
                  <CircularProgress size={16} className="text-white" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>
        
        <Box className="flex justify-end gap-2 mt-4 mb-4">
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<IconTrash size={18} />}
                onClick={() => setDeleteDialogOpen(true)}
                className="!bg-red-500 !text-white"
              >
                Xóa
              </Button>
              <Button
                variant="contained"
                startIcon={<IconEdit size={18} />}
                onClick={() => setIsEditing(true)}
                className="!normal-case !bg-main-golden-orange"
              >
                Cập nhật
              </Button>
            </>
          ) : null}
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle className="!text-lg font-bold text-main-dark-blue">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa sản phẩm &quot;{formData.name}&quot;? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ?
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div> : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage; 