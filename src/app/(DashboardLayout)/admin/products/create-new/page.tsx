"use client"

import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { IconArrowLeft, IconUpload, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { message } from "antd"
import { useCreateProduct } from '@/hooks/product';
import { useUploadImage } from '@/hooks/image';
import { ICreateProduct } from '@/interface/request/product';

export default function CreateProductPage() {
  const router = useRouter();
  const createProductMutation = useCreateProduct();
  const uploadImageMutation = useUploadImage();

  const [formData, setFormData] = useState<ICreateProduct>({
    name: '',
    description: '',
    imageUrl: '',
    categoryId: '',
    salePrice: '',
    price: '',
    stock: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the payload
      let payload: ICreateProduct = {
        name: formData.name,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price.toString()) : 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice.toString()) : 0,
        stock: typeof formData.stock === 'string' ? parseInt(formData.stock, 10) : formData.stock,
        categoryId: formData.categoryId || undefined,
      };
      
      // Upload image if available
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" });
        
        try {
          const uploadResult = await uploadImageMutation.mutateAsync({
            file: imageFile,
            isPublic: true,
            description: `Hình ảnh cho sản phẩm: ${formData.name}`
          });
          
          message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" });
          
          // Add the image URL to the payload
          payload.imageUrl = uploadResult.data.url;
        } catch (error) {
          message.error({ content: "Lỗi khi tải hình ảnh!", key: "uploadImage" });
          console.error("Image upload error:", error);
          return; // Stop if image upload fails
        }
      }
      
      // Create the product
      message.loading({ content: "Đang tạo sản phẩm...", key: "createProduct" });
      await createProductMutation.mutateAsync(payload);
      
      message.success({ content: "Sản phẩm đã được tạo thành công!", key: "createProduct" });
      router.push("/admin/products");
    } catch (error) {
      message.error({ content: "Không thể tạo sản phẩm. Vui lòng thử lại.", key: "createProduct" });
      console.error("Product creation error:", error);
    }
  };

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={() => router.push("/admin/products")}
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
          Tạo sản phẩm mới
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                Hình ảnh sản phẩm
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 max-w-lg overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Product preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                  >
                    <IconX size={16} color="white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 transition-colors border border-gray-500 border-dashed !rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload hình ảnh</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </Grid>
          </Grid>
          
          <Box className="flex justify-end gap-4">
            <Button
              className="!normal-case"
              type="button"
              variant="outlined"
              onClick={() => router.push("/admin/products")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createProductMutation.isPending}
              className="text-black !bg-main-golden-orange hover:bg-amber-600 !normal-case"
            >
              {createProductMutation.isPending ? (
                <CircularProgress size={24} className="text-gray-800" />
              ) : (
                "Tạo sản phẩm"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}