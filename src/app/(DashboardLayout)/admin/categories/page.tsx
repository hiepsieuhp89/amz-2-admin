"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Pagination,
} from "@mui/material"
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconPlus,
  IconEye,
} from "@tabler/icons-react"
import { message, Modal } from "antd"

import { useDeleteCategory, useGetAllCategories } from "@/hooks/category"

export default function CategoriesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const { data: categoriesData, isLoading, error } = useGetAllCategories({ page, limit })
  const deleteCategory = useDeleteCategory()

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setPage(1)
  }

  const handleViewCategory = (id: string) => {
    router.push(`/admin/categories/${id}`)
  }

  const handleEditCategory = (id: string) => {
    router.push(`/admin/categories/edit?id=${id}`)
  }

  const handleCreateCategory = () => {
    router.push("/admin/categories/create-new")
  }

  const confirmDelete = (id: string) => {
    setCategoryToDelete(id)
    setDeleteModalVisible(true)
  }

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false)
    setCategoryToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory.mutateAsync(categoryToDelete)
        message.success("Danh mục đã được xóa thành công!")
        setDeleteModalVisible(false)
        setCategoryToDelete(null)
      } catch (error) {
        message.error("Không thể xóa danh mục. Vui lòng thử lại.")
        console.error(error)
      }
    }
  }

  const filteredCategories = categoriesData?.data.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-6">
        <Typography variant="h5" className="font-bold text-white">
          Quản lý danh mục
        </Typography>
        <Button
          variant="contained"
          startIcon={<IconPlus size={18} />}
          onClick={handleCreateCategory}
          className="text-black !bg-main-golden-orange hover:bg-amber-600"
        >
          Tạo danh mục mới
        </Button>
      </Box>

      <Paper className="mb-6 border border-gray-700 bg-main-gunmetal-blue">
        <Box className="p-4">
          <TextField
            fullWidth
            value={search}
            onChange={handleSearch}
            placeholder="Tìm kiếm danh mục..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="rounded"
          />
        </Box>
      </Paper>

      <Paper className="overflow-hidden border border-gray-700 bg-main-gunmetal-blue">
        {isLoading ? (
          <Box className="flex items-center justify-center p-6">
            <CircularProgress className="text-main-golden-orange" />
          </Box>
        ) : error ? (
          <Box className="p-6 text-center">
            <Typography className="text-red-400">
              Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
            </Typography>
          </Box>
        ) : filteredCategories.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead className="bg-main-dark-blue">
                  <TableRow>
                    <TableCell className="text-white">Tên danh mục</TableCell>
                    <TableCell className="text-white">Mô tả</TableCell>
                    <TableCell className="text-white">Danh mục cha</TableCell>
                    <TableCell className="text-white">Trạng thái</TableCell>
                    <TableCell className="text-white" align="right">
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover:bg-main-dark-blue/40">
                      <TableCell>
                        <Typography className="font-medium text-white">{category.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-gray-300 truncate max-w-[200px]">
                          {category.description || "Không có mô tả"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-gray-300">
                          {category.parent?.name || "Danh mục gốc"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={category.isActive ? "Hoạt động" : "Không hoạt động"}
                          size="small"
                          className={
                            category.isActive ? "bg-green-700 text-white" : "bg-gray-600 text-gray-300"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box className="flex justify-end space-x-2">
                          <IconButton
                            onClick={() => handleViewCategory(category.id)}
                            className="text-blue-400 hover:bg-blue-900/20"
                          >
                            <IconEye size={20} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditCategory(category.id)}
                            className="text-amber-400 hover:bg-amber-900/20"
                          >
                            <IconEdit size={20} />
                          </IconButton>
                          <IconButton
                            onClick={() => confirmDelete(category.id)}
                            className="text-red-400 hover:bg-red-900/20"
                          >
                            <IconTrash size={20} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box className="flex items-center justify-center p-4">
              <Pagination
                count={Math.ceil((categoriesData?.total || 0) / limit)}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                className="text-white"
              />
            </Box>
          </>
        ) : (
          <Box className="p-6 text-center">
            <Typography className="text-gray-400">
              {search ? "Không tìm thấy danh mục phù hợp" : "Chưa có danh mục nào"}
            </Typography>
          </Box>
        )}
      </Paper>

      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel} className="text-gray-300 hover:bg-gray-700">
            Hủy
          </Button>,
          <Button
            key="delete"
            onClick={handleDeleteConfirm}
            className="text-white bg-red-600 hover:bg-red-700"
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ? "Đang xóa..." : "Xóa"}
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.</p>
      </Modal>
    </div>
  )
} 