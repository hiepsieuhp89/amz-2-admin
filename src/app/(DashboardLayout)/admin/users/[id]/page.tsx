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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteUser, useGetUserById, useUpdateUser } from "@/hooks/user"
import { UserRole } from "@/interface/request/user"

function UserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    phone: "",
    role: "user",
    isActive: false,
    balance: 0,
  })
  const [errors, setErrors] = useState({
    email: "",
    phone: ""
  })

  const { data: userData, isLoading, error } = useGetUserById(id)
  const deleteUserMutation = useDeleteUser()
  const updateUserMutation = useUpdateUser()

  useEffect(() => {
    if (userData?.data) {
      setFormData({
        email: userData?.data.email || "",
        username: userData.data.username,
        fullName: userData.data.fullName || "",
        phone: userData.data.phone || "",
        role: userData.data.role || "user",
        isActive: userData.data.isActive || false,
        balance: Number(userData.data.balance),
      })
    }
  }, [userData])

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: "",
      phone: ""
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleBack = () => {
    router.push("/admin/users")
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(id)
      message.success("Người dùng đã được xóa thành công!")
      router.push("/admin/users")
    } catch (error) {
      message.error("Không thể xóa người dùng. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    
    if (name) {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập")
      return
    }
    
    try {
      await updateUserMutation.mutateAsync({
        id,
        payload: {
          ...formData,
          role: formData.role as UserRole,
        },
      })
      message.success("Thông tin người dùng đã được cập nhật!")
      setIsEditing(false)
    } catch (error) {
      message.error("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.")
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

  if (error || !userData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin người dùng
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Không tìm thấy người dùng hoặc đã bị xóa"}
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
          Chi tiết người dùng
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tên đăng nhập"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true} // Không cho phép thay đổi username
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Họ tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel id="role-label">Vai trò</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  label="Vai trò"
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                >
                  <MenuItem value="user">Người dùng</MenuItem>
                  <MenuItem value="seller">Người bán</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                size="small"
                label="Số dư"
                name="balance"
                type="number"
                value={formData.balance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Typography
              fontSize={14}
              variant="subtitle1"
            >
              Trạng thái tài khoản
            </Typography>
            <FormControlLabel
              label={formData.isActive ? "Đang hoạt động" : "Đã khóa"}
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
                disabled={updateUserMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updateUserMutation.isPending ? (
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
            Bạn có chắc chắn muốn xóa người dùng "{formData.fullName || formData.username}"? Hành động này không thể hoàn tác.
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
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ?
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

export default UserDetailPage; 