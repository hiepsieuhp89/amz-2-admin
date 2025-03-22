"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Autocomplete,
  Chip,
  Grid,
} from "@mui/material"
import { IconUpload, IconX, IconArrowLeft, IconPlus } from "@tabler/icons-react"
import { message } from "antd"

import { useCreateProduct } from "@/hooks/product"
import { useUploadImage } from "@/hooks/image"
import type { ICreateProduct } from "@/interface/request/product"

export default function CreateProductPage() {
  const router = useRouter()
  const createProductMutation = useCreateProduct()
  const uploadImageMutation = useUploadImage()

  const [formData, setFormData] = useState<ICreateProduct>({
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
    compareAtPrice: 0,
    quantity: 0,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    tags: [],
    metaKeywords: [],
    attributes: {},
    specifications: {},
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [tag, setTag] = useState("")
  const [metaKeyword, setMetaKeyword] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
  }

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
      tags: prev.tags?.filter((t) => t !== tagToRemove) || [],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let productData = { ...formData }
      
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: imageFile,
          isPublic: true,
          description: `Hình ảnh cho sản phẩm: ${formData.name}`
        })
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })
        
        // Thêm URL hình ảnh vào formData
        // Lưu ý: Trong interface không có trường imageUrl, nên cần điều chỉnh theo API thực tế
      }
      
      await createProductMutation.mutateAsync(productData)
      message.success("Sản phẩm đã được tạo thành công!")
      router.push("/admin/products")
    } catch (error) {
      message.error("Không thể tạo sản phẩm. Vui lòng thử lại.")
      console.error(error)
    }
  }

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
                Tags
              </Typography>
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
              <Box className="flex flex-wrap gap-1">
                {formData.tags?.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    onDelete={() => removeTag(t)}
                    className="m-1"
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                Hình ảnh sản phẩm
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 w-full h-32 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview}
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
                />
              </Box>
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
              <Box className="flex flex-wrap gap-1">
                {formData.metaKeywords?.map((k) => (
                  <Chip
                    key={k}
                    label={k}
                    onDelete={() => removeMetaKeyword(k)}
                    className="m-1"
                  />
                ))}
              </Box>
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
  )
} 