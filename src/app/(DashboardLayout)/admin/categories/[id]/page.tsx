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
import { useUploadImage } from "@/hooks/image"
import { ICategory } from "@/interface/request/category"

function CategoryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState({
    name: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { data: categoryData, isLoading, error } = useGetCategoryById(id)
  const { data: categoriesData } = useGetAllCategories()
  const deleteCategory = useDeleteCategory()
  const updateCategory = useUpdateCategory()
  const uploadImageMutation = useUploadImage()

  const handlePaste = (e: ClipboardEvent) => {
    if (!isEditing) return;
    
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
          };
          reader.readAsDataURL(file);

          setFormData((prev) => ({
            ...prev,
            imageUrl: "image-url-placeholder",
          }));
          break;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [isEditing]);

  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data
      setFormData({
        name: category.name || "",
        description: category.description || "",
        parentId: category.parentId || "",
        imageUrl: (category as any)?.imageUrl || "",
      })
      if ((category as any)?.imageUrl) {
        setImagePreview((category as any)?.imageUrl)
      }
    }
  }, [categoryData])

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
    }

    // Validate name
    if (formData.name.trim().length < 2) {
      newErrors.name = "Tên danh mục phải có ít nhất 2 ký tự"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleBack = () => {
    router.push("/admin/categories")
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory.mutateAsync(id)
      message.success("Danh mục đã được xóa thành công!")
      router.push("/admin/categories")
    } catch (error) {
      message.error("Không thể xóa danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement
    
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
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
        imageUrl: "image-url-placeholder",
      }))
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập")
      return
    }
    
    try {
      let updatedFormData = { ...formData }
      
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: imageFile,
          isPublic: true,
          description: `Hình ảnh cho danh mục: ${formData.name}`
        })
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })
        
        // Cập nhật URL hình ảnh từ kết quả tải lên
        updatedFormData = {
          ...updatedFormData,
          imageUrl: uploadResult.data.url
        }
      }
      
      await updateCategory.mutateAsync({
        id,
        payload: {
          ...updatedFormData,
          id: categoryData?.data?.id || "",
        },
      })
      message.success("Danh mục đã được cập nhật thành công!")
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

  const availableParentCategories = categoriesData?.data?.data?.filter((cat: ICategory) => cat.id !== id) || []

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
          Chi tiết danh mục
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
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
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel id="parentId-label">Danh mục cha</InputLabel>
                <Select
                  labelId="parentId-label"
                  name="parentId"
                  value={formData.parentId || ""}
                  label="Danh mục cha"
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                >
                  <MenuItem value="">Không có</MenuItem>
                  {availableParentCategories.map((category: ICategory) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
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
            <div>
              <Typography fontSize={14} variant="subtitle1" className="!mb-2">
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
              ) : isEditing ? (
                <label className="flex flex-col items-center justify-center w-full h-32 transition-colors border border-gray-500 border-dashed !rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload hình ảnh</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              ) : (
                <div className="flex items-center justify-center w-full h-32 border border-gray-300 rounded">
                  <Typography className="text-gray-400">
                    Chưa có hình ảnh
                  </Typography>
                </div>
              )}
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
                  <CircularProgress size={16} className="text-white" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>
        <Box className={`flex justify-end gap-2 ${isEditing ? 'mt-0' : 'mt-6'}`}>
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
         <DialogTitle fontSize={18}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa danh mục "{formData.name}"? Hành động này không thể hoàn tác.
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
            variant="outlined"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ?
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div> : <span className="!text-white">Xóa</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CategoryDetailPage; 