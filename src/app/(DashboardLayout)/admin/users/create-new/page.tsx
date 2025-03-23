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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from "@mui/material"
import { IconArrowLeft } from "@tabler/icons-react"
import { message } from "antd"

import { useCreateUser } from "@/hooks/user"

export default function CreateUserPage() {
  const router = useRouter()
  const createUserMutation = useCreateUser()

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
    phone: "",
    role: "user" ,
    isActive: true,
    balance: 0
  })

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    phone: ""
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: "",
      username: "",
      password: "",
      phone: ""
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }

    // Validate username
    if (formData.username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự"
      isValid = false
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập")
      return
    }
    
    try {
      await createUserMutation.mutateAsync(formData)
      message.success("Người dùng đã được tạo thành công!")
      router.push("/admin/users")
    } catch (error) {
      message.error("Không thể tạo người dùng. Vui lòng thử lại.")
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={() => router.push("/admin/users")}
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
          Tạo người dùng mới
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
                error={!!errors.username}
                helperText={errors.username}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
            <div>
              <FormControl fullWidth size="small">
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
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              />
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
                  />
                }
              />
            </div>
          </div>

          <Box className="flex justify-end gap-4">
            <Button
              className="!normal-case"
              type="button"
              variant="outlined"
              onClick={() => router.push("/admin/users")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createUserMutation.isPending}
              className="text-black !bg-main-golden-orange hover:bg-amber-600 !normal-case"
            >
              {createUserMutation.isPending ? (
                <CircularProgress size={24} className="text-gray-800" />
              ) : (
                "Tạo người dùng"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  )
} 