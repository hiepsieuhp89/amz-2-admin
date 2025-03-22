"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteCategory, useGetCategoryById, useUpdateCategory, useGetAllCategories } from "@/hooks/category"

export default function CategoryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    isActive: true,
    image: "",
  })

  const { data: categoryData, isLoading, error } = useGetCategoryById(id)
  const { data: categoriesData } = useGetAllCategories()
  const deleteCategory = useDeleteCategory()
  const updateCategory = useUpdateCategory()

  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data
      setFormData({
        name: category.name,
        description: category.description || "",
        parent: category.parentId || "",
        isActive: category.isActive,
        image: category.image || "",
      })
      setImagePreview(category.image || "")
    }
  }, [categoryData])

  const handleBack = () => {
    router.push("/admin/categories")
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory.mutateAsync(id)
      message.success("Danh mục đã được xóa!")
      router.push("/admin/categories")
    } catch (error) {
      message.error("Không thể xóa danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

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
      await updateCategory.mutateAsync({
        id,
        payload: formData,
      })
      message.success("Danh mục đã được cập nhật!")
      setIsEditing(false)
    } catch (error) {
      message.error("Không thể cập nhật danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    )
  }

  if (error || !categoryData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải danh mục
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Không tìm thấy danh mục hoặc đã bị xóa"}
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

  const availableParentCategories = categoriesData?.data.filter(cat => cat.id !== id) || []

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
          Quản lý danh mục
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <Box className="flex justify-end gap-2 mb-4">
          {!isEditing ? (
            <>
              <Button
                variant="outlined"
                startIcon={<IconEdit size={18} />}
                onClick={() => setIsEditing(true)}
                className="text-blue-400 border-blue-500 hover:bg-blue-900/30"
              >
                Chỉnh sửa danh mục
              </Button>
              <Button
                variant="outlined"
                startIcon={<IconTrash size={18} />}
                onClick={() => setDeleteDialogOpen(true)}
                className="text-red-400 border-red-500 hover:bg-red-900/30"
              >
                Xóa
              </Button>
            </>
          ) : null}
        </Box>

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
                disabled={!isEditing}
              />

              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel>Danh mục cha</InputLabel>
                <Select
                  name="parent"
                  value={formData.parent}
                  label="Danh mục cha"
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                >
                  <MenuItem value="">Không có</MenuItem>
                  {availableParentCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
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
              disabled={!isEditing}
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
                  {isEditing && (
                    <button
                      type="button"
                      onClick={removeImage}
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
                  {isEditing && <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />}
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
                      disabled={!isEditing}
                    />
                  }
                />
              </div>
            </div>
          </div>
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
                disabled={updateCategory.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updateCategory.isPending ? (
                  <CircularProgress size={24} className="text-gray-800" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "bg-main-charcoal-blue text-white",
        }}
      >
        <DialogTitle className="text-white">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-300">
            Bạn có chắc chắn muốn xóa danh mục "{formData.name}"? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            className="text-gray-300 hover:bg-gray-700"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="text-white bg-red-600 hover:bg-red-700"
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
} 