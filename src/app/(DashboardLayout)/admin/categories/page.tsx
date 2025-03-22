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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconPlus,
  IconEye,
  IconCategory,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteCategory, useGetAllCategories } from "@/hooks/category"

export default function CategoriesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const { data: categoriesData, isLoading, error } = useGetAllCategories({ page, order: "DESC" })
  const deleteCategory = useDeleteCategory()

  const filteredCategories = categoriesData?.data?.data?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleView = (id: string) => {
    router.push(`/admin/categories/${id}`)
  }

  const handleCreateNew = () => {
    router.push("/admin/categories/create-new")
  }

  const openDeleteDialog = (id: string) => {
    setCategoryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return

    try {
      await deleteCategory.mutateAsync(categoryToDelete)
      message.success("Danh mục đã được xóa thành công!")
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      message.error("Không thể xóa danh mục. Vui lòng thử lại.")
      console.error(error)
    }
  }

  if (error) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải danh sách danh mục
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <IconCategory size={28} className="mr-3 text-main-golden-orange" />
          <Typography
            fontSize={18}
            fontWeight={700}
            variant="h5"
            className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
          >
            Quản lý danh mục
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm danh mục..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded shadow-sm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} className="text-main-golden-orange" />
                </InputAdornment>
              ),
              className: "text-white rounded-lg hover:shadow-md transition-shadow",
            }}
          />
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={handleCreateNew}
            className="text-white !normal-case !bg-main-charcoal-blue hover:!bg-main-dark-blue transition-all shadow-md"
          >
            Tạo danh mục mới
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : filteredCategories.length === 0 ? (
        <Box className="flex flex-col items-center justify-center gap-4 py-8 text-center border border-gray-700 border-dashed rounded-lg backdrop-blur-sm">
          <Typography fontWeight={400} variant="h6" className="mb-2 text-gray-400">
            Không tìm thấy danh mục nào. {searchTerm ? "Thử tìm kiếm với từ khác" : "Tạo danh mục đầu tiên"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="outlined"
              startIcon={<IconPlus size={18} />}
              onClick={handleCreateNew}
              className="transition-all w-fit !normal-case"
            >
              Tạo danh mục mới
            </Button>
          )}
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", border: "1px solid #E0E0E0" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="categories table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Tên danh mục</TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Mô tả</TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Danh mục cha</TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Ngày tạo</TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Ngày cập nhật</TableCell>
                  <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(filteredCategories) &&
                  filteredCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      sx={{
                        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
                        "& td": { borderBottom: "1px solid #E0E0E0" },
                      }}
                    >
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Typography className="truncate max-w-[200px]">
                          {category.description || "Không có mô tả"}
                        </Typography>
                      </TableCell>
                      <TableCell>{category.parent?.name || "Danh mục gốc"}</TableCell>
                      <TableCell>{new Date(category.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{new Date(category.updatedAt).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        <Box className="flex items-center gap-2">
                          <IconButton onClick={() => handleView(category.id)} size="medium" className="!bg-blue-100">
                            <IconEye size={18} className="text-blue-400" />
                          </IconButton>
                          <IconButton onClick={() => openDeleteDialog(category.id)} size="medium" className="!bg-red-100">
                            <IconTrash size={18} className="text-red-400" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

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
            Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ? (
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div>
            ) : (
              "Xóa"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
} 