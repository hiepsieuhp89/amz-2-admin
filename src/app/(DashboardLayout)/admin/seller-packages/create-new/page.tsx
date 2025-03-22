"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, Button, FormControlLabel, Switch, Box, Typography, Paper, CircularProgress } from "@mui/material"
import { IconUpload, IconX, IconArrowLeft } from "@tabler/icons-react"
import { message } from "antd"

import { useCreateSellerPackage } from "@/hooks/seller-package"
import { useUploadImage } from "@/hooks/image"

function CreateSellerPackagePage() {
  const router = useRouter()
  const createPackageMutation = useCreateSellerPackage()
  const uploadImageMutation = useUploadImage()

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    isActive: true,
    duration: 30,
    percentProfit: 0,
    maxProducts: 10,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

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

      setFormData((prev) => ({
        ...prev,
        image: "image-url-placeholder",
      }))
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setFormData((prev) => ({
      ...prev,
      image: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let updatedFormData = { ...formData }
      
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })
        
        const formDataUpload = new FormData()
        formDataUpload.append("file", imageFile)
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: imageFile,
          isPublic: true,
          description: `Hình ảnh cho gói bán hàng: ${formData.name}`
        })
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })
        
        // Cập nhật URL hình ảnh từ kết quả tải lên
        updatedFormData = {
          ...updatedFormData,
          image: uploadResult.data.url
        }
      }
      
      // Gửi dữ liệu gói bán hàng với URL hình ảnh đã cập nhật
      await createPackageMutation.mutateAsync(updatedFormData)
      message.success("Gói bán hàng đã được tạo thành công!")
      router.push("/admin/seller-packages")
    } catch (error) {
      message.error("Không thể tạo gói bán hàng. Vui lòng thử lại.")
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={() => router.push("/admin/seller-packages")}
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
          Quản lý gói bán hàng
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <TextField
                size="small"
                label="Tên gói bán hàng"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded "
              />

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
                className="rounded "
              />
            </div>

            <TextField
              size="small"
              label="Mô tả"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              className="rounded "
            />
          </div>
          <div className="grid items-stretch grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <TextField
                size="small"
                label="Thời hạn (ngày)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded "
              />

              <TextField
                size="small"
                label="Phần trăm lợi nhuận"
                name="percentProfit"
                type="number"
                value={formData.percentProfit}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded "
              />

              <TextField
                size="small"
                label="Sản phẩm tối đa"
                name="maxProducts"
                type="number"
                value={formData.maxProducts}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded "
              />
            </div>
            <div>
              <Typography 
              fontSize={14}
              variant="subtitle1" className="!mb-2">
                Hình ảnh gói bán hàng
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 w-full h-32 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview}
                    alt="Package preview"
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
              <div className="flex items-center gap-2 mt-2">
              <Typography 
              fontSize={14}
              variant="subtitle1">
                Kích hoạt
              </Typography>
              <FormControlLabel
                label=""
            control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" color="primary" />}
          />
              </div>
            </div>
          </div>
          <Box className="flex justify-end gap-4">
            <Button
              className="!normal-case"
              type="button"
              variant="outlined"
              onClick={() => router.push("/admin/seller-packages")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createPackageMutation.isPending}
              className="text-black !bg-main-golden-orange hover:bg-amber-600 !normal-case"
            >
              {createPackageMutation.isPending ? (
                <CircularProgress size={24} className="text-gray-800" />
              ) : (
                "Tạo gói bán hàng"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
}

export default CreateSellerPackagePage;
