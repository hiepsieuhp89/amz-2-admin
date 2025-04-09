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
} from "@mui/material"
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconX,
  IconUpload,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteSpreadPackage, useGetSpreadPackageById, useUpdateSpreadPackage } from "@/hooks/spread-package"
import { useUploadImage } from "@/hooks/image"

function SpreadPackageDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: 0,
    isActive: false,
    image: "",
  })

  const { data: packageData, isLoading, error } = useGetSpreadPackageById(id)
  const deletePackageMutation = useDeleteSpreadPackage()
  const updatePackageMutation = useUpdateSpreadPackage()
  const uploadImageMutation = useUploadImage()

  useEffect(() => {
    if (packageData?.data) {
      const pkg = packageData.data
      setFormData({
        name: pkg.name,
        price: pkg.price,
        description: pkg.description || "",
        duration: pkg.duration,
        isActive: pkg.isActive,
        image: pkg.image || "",
      })
      setImagePreview(pkg.image || "")
    }
  }, [packageData])

  const handleBack = () => {
    router.push("/admin/spread-packages")
  }

  const handleDeleteConfirm = async () => {
    try {
      await deletePackageMutation.mutateAsync(id)
      message.success("Gói quảng bá đã được xóa thành công!")
      router.push("/admin/spread-packages")
    } catch (error) {
      message.error("Không thể xóa gói quảng bá. Vui lòng thử lại.")
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
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setImageFile(null)
    setFormData({
      ...formData,
      image: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      let updatedFormData = { ...formData }
      
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: imageFile,
          isPublic: true,
          description: `Hình ảnh cho gói quảng bá: ${formData.name}`
        })
        
        message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })
        
        // Cập nhật URL hình ảnh từ kết quả tải lên
        updatedFormData = {
          ...updatedFormData,
          image: uploadResult.data.url
        }
      }
      
      await updatePackageMutation.mutateAsync({
        id,
        payload: updatedFormData,
      })
      message.success("Gói quảng bá đã được cập nhật!")
      setIsEditing(false)
    } catch (error) {
      message.error("Không thể cập nhật gói quảng bá. Vui lòng thử lại.")
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

  if (error || !packageData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải gói quảng bá
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Không tìm thấy gói quảng bá hoặc đã bị xóa"}
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

  const { data: pkg } = packageData

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
          Chi tiết gói quảng bá
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <TextField
                size="small"
                label="Tên gói quảng bá"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
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
                className="rounded"
                disabled={!isEditing}
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
              className="rounded"
              disabled={!isEditing}
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
                className="rounded"
                disabled={!isEditing}
              />
              
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
            <div>
              <Typography
                fontSize={14}
                variant="subtitle1"
                className="!mb-2"
              >
                Hình ảnh gói quảng bá
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 w-full h-32 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview}
                    alt="Package preview"
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
                disabled={updatePackageMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updatePackageMutation.isPending ? (
                  <CircularProgress size={16} className="text-white" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>
        <Box className="flex justify-end gap-2 mb-4">
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
            Bạn có chắc chắn muốn xóa gói quảng bá &quot;{formData.name}&quot;? Hành động này không thể hoàn tác.
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
            disabled={deletePackageMutation.isPending}
          >
            {deletePackageMutation.isPending ?
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

export default SpreadPackageDetailPage; 