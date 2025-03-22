"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  CircularProgress,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import { IconArrowLeft, IconUpload, IconX } from "@tabler/icons-react"
import { message } from "antd"

import { useCreateCategory, useGetAllCategories } from "@/hooks/category"

export default function CreateCategoryPage() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    isActive: true,
    image: "",
  })

  const createCategory = useCreateCategory()
  const { data: categoriesData, isLoading: loadingCategories } = useGetAllCategories()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({
          ...formData,
          image: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setFormData({
      ...formData,
      image: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createCategory.mutateAsync(formData)
      message.success("Danh mục đã được tạo thành công!")
      router.push("/admin/categories")
    } catch (error) {
      message.error("Không thể tạo danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={() => router.push("/admin/categories")}
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
          Tạo danh mục mới
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <TextField
                size="small"
                label="Tên danh mục"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
              />

              <FormControl fullWidth size="small">
                <InputLabel>Danh mục cha</InputLabel>
                <Select
                  name="parent"
                  value={formData.parent}
                  label="Danh mục cha"
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                >
                  <MenuItem value="">Không có</MenuItem>
                  {loadingCategories ? (
                    <MenuItem disabled>Đang tải danh mục...</MenuItem>
                  ) : (
                    categoriesData?.data.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>

            <TextField
              size="small"
              label="Mô tả"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              className="rounded"
            />
          </div>
          <div className="grid items-stretch grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Typography 
                fontSize={14}
                variant="subtitle1" 
                className="!mb-2"
              >
                Hình ảnh danh mục
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 w-full h-32 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview}
                    alt="Category preview"
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
                  variant="subtitle1" 
                >
                  Kích hoạt
                </Typography>
                <FormControlLabel
                  label=""
                  control={
                    <Switch 
                      checked={formData.isActive} 
                      onChange={handleChange} 
                      name="isActive" 
                      color="primary"
                    />
                  }
                />
              </div>
            </div>
          </div>
          <Box className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push("/admin/categories")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createCategory.isPending}
              className="text-black !bg-main-golden-orange hover:bg-amber-600"
            >
              {createCategory.isPending ? (
                <CircularProgress size={24} className="text-gray-800" />
              ) : (
                "Tạo danh mục"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
} 