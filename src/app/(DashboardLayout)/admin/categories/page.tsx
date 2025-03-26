"use client"

import DataTable from "@/components/DataTable"
import { useDeleteCategory, useGetAllCategories } from "@/hooks/category"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import {
  IconEye,
  IconSearch,
  IconTrash
} from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CategoriesPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const { data: categoriesData, isLoading, error } = useGetAllCategories({
    page,
    take: rowsPerPage,
    order: "DESC"
  })
  const deleteCategory = useDeleteCategory()

  const filteredCategories = categoriesData?.data?.data || []
  const pagination = categoriesData?.data?.meta || {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  }

  const handleCreateNew = () => {
    router.push("/admin/categories/create-new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/categories/${id}`)
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

  const columns = [
    { key: 'name', label: 'Tên danh mục' },
    { key: 'description', label: 'Mô tả' },
    { key: 'parent', label: 'Danh mục cha' },
    { key: 'createdAt', label: 'Ngày tạo' },
    { key: 'updatedAt', label: 'Ngày cập nhật' },
    { key: 'actions', label: 'Thao tác' },
  ]

  const renderRow = (category: any, index: number) => (
    <TableRow
      key={category.id}
      sx={{
        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
        "& td": { borderBottom: "1px solid #E0E0E0" },
        backgroundColor: index % 2 !== 1 ? '#F5F5F5' : '#FFFFFF'
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
  )

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
    <>
      <DataTable
        columns={columns}
        data={filteredCategories}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onRowsPerPageChange={(newRowsPerPage) => {
          setRowsPerPage(newRowsPerPage)
          setPage(1)
        }}
        renderRow={(row: any, index: number) => renderRow(row, index)}
        emptyMessage="Không tìm thấy danh mục nào"
        createNewButton={{
          label: "Tạo danh mục mới",
          onClick: handleCreateNew
        }}
        searchComponent={
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
          </div>
        }
      />
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
            Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
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
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ?
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div> : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
} 