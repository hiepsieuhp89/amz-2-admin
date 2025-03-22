import React, { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { IconArrowLeft, IconEdit, IconPlus, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { message } from "antd"

const ProductDetailPage = () => {
  const router = useRouter();
  const { productData, updateProductMutation, deleteProductMutation } = useProduct();

  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    compareAtPrice: '',
    costPrice: '',
    quantity: '',
    sku: '',
    barcode: '',
    categoryId: '',
    brandId: '',
    shortDescription: '',
    description: '',
    isActive: true,
    isFeatured: false,
    isDigital: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    tags: [],
    image: null,
    imagePreview: null,
  });
  const [tag, setTag] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');

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

  const addTag = () => {
    if (tag.trim() !== "" && !formData.tags?.includes(tag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()],
      }))
      setTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((k) => k !== tagToRemove) || [],
    }))
  }

  const addMetaKeyword = () => {
    if (metaKeyword.trim() !== "" && !formData.metaKeywords?.includes(metaKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        metaKeywords: [...(prev.metaKeywords || []), metaKeyword.trim()],
      }))
      setMetaKeyword("")
    }
  }

  const removeMetaKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords?.filter((k) => k !== keywordToRemove) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      let updatedFormData = { ...formData }
      
      if (formData.image) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: formData.image,
          isPublic: true,
          description: `Hình ảnh cho sản phẩm: ${formData.name}`
        })
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })
        
        // Cập nhật hình ảnh sẽ được xử lý bởi API backend
      }
      
      await updateProductMutation.mutateAsync({
        id: productData.id,
        payload: updatedFormData,
      })
      message.success("Sản phẩm đã được cập nhật!")
      setIsEditing(false)
    } catch (error) {
      message.error("Không thể cập nhật sản phẩm. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductMutation.mutateAsync(productData.id)
      message.success("Sản phẩm đã được xóa thành công!")
      router.back()
    } catch (error) {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.")
      console.error(error)
    }
  }

  if (updateProductMutation.isPending || deleteProductMutation.isPending) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    )
  }

  if (productData.error || !productData.data) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin sản phẩm
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {productData.error?.message || "Sản phẩm không tồn tại hoặc đã bị xóa"}
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
    )
  }

  const { data: product } = productData;

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
                name="compareAtPrice"
                type="number"
                value={formData.compareAtPrice}
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
                label="Giá vốn"
                name="costPrice"
                type="number"
                value={formData.costPrice}
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
                name="quantity"
                type="number"
                value={formData.quantity}
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
                label="SKU"
                name="sku"
                value={formData.sku}
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
                label="Mã vạch"
                name="barcode"
                value={formData.barcode}
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
            
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="ID Thương hiệu"
                name="brandId"
                value={formData.brandId}
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
                label="Mô tả ngắn"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
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
            
            <Grid item xs={12}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                Tags
              </Typography>
              {isEditing && (
                <Box className="flex gap-2 mb-2">
                  <TextField
                    size="small"
                    placeholder="Thêm tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    variant="outlined"
                    className="rounded"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={addTag}
                    className="text-black !bg-main-golden-orange hover:bg-amber-600"
                  >
                    <IconPlus size={18} />
                  </Button>
                </Box>
              )}
              <Box className="flex flex-wrap gap-1">
                {formData.tags?.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    onDelete={isEditing ? () => removeTag(t) : undefined}
                    className="m-1"
                  />
                ))}
              </Box>
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
            
            <Grid item xs={12} md={6}>
              <Box className="flex flex-col h-full">
                <Box className="mb-2">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={handleChange}
                        name="isActive"
                        color="primary"
                        disabled={!isEditing}
                      />
                    }
                    label="Kích hoạt"
                  />
                </Box>
                <Box className="mb-2">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        name="isFeatured"
                        color="primary"
                        disabled={!isEditing}
                      />
                    }
                    label="Sản phẩm nổi bật"
                  />
                </Box>
                <Box className="mb-2">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isDigital}
                        onChange={handleChange}
                        name="isDigital"
                        color="primary"
                        disabled={!isEditing}
                      />
                    }
                    label="Sản phẩm kỹ thuật số"
                  />
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                SEO
              </Typography>
              <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  size="small"
                  label="Meta title"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  className="rounded"
                  disabled={!isEditing}
                />
                <TextField
                  size="small"
                  label="Meta description"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  className="rounded"
                  disabled={!isEditing}
                />
              </Box>
              {isEditing && (
                <Box className="flex gap-2 mt-4 mb-2">
                  <TextField
                    size="small"
                    placeholder="Thêm từ khóa meta"
                    value={metaKeyword}
                    onChange={(e) => setMetaKeyword(e.target.value)}
                    variant="outlined"
                    className="rounded"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMetaKeyword();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={addMetaKeyword}
                    className="text-black !bg-main-golden-orange hover:bg-amber-600"
                  >
                    <IconPlus size={18} />
                  </Button>
                </Box>
              )}
              <Box className="flex flex-wrap gap-1">
                {formData.metaKeywords?.map((k) => (
                  <Chip
                    key={k}
                    label={k}
                    onDelete={isEditing ? () => removeMetaKeyword(k) : undefined}
                    className="m-1"
                  />
                ))}
              </Box>
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
            Bạn có chắc chắn muốn xóa sản phẩm "{formData.name}"? Hành động này không thể hoàn tác.
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
  )
}

export default ProductDetailPage; 