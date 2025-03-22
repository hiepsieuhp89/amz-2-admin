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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import { IconArrowLeft } from "@tabler/icons-react"
import { message } from "antd"

import { useCreateCategory, useGetAllCategories } from "@/hooks/category"
import { ICategory } from "@/interface/request/category"

export default function CreateCategoryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
  })
  const [errors, setErrors] = useState({
    name: "",
  })

  const createCategoryMutation = useCreateCategory()
  const { data: categoriesData } = useGetAllCategories()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement
    
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
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
      await createCategoryMutation.mutateAsync({
        ...formData,
        id: "",
      })
      message.success("Danh mục đã được tạo thành công!")
      router.push("/admin/categories")
    } catch (error) {
      message.error("Không thể tạo danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const availableParentCategories = categoriesData?.data?.data || []

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
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="parentId-label">Danh mục cha</InputLabel>
                <Select
                  labelId="parentId-label"
                  name="parentId"
                  value={formData.parentId}
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

          <div className="grid grid-cols-1 gap-6">
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
              />
            </div>
          </div>

          <Box className="flex justify-end gap-4">
            <Button
              className="!normal-case"
              type="button"
              variant="outlined"
              onClick={() => router.push("/admin/categories")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createCategoryMutation.isPending}
              className="text-black !bg-main-golden-orange hover:bg-amber-600 !normal-case"
            >
              {createCategoryMutation.isPending ? (
                <CircularProgress size={16} className="text-white" />
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