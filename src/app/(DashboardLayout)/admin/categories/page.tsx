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
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import {
  IconEye,
  IconSearch,
  IconTrash,
  IconDotsVertical,
  IconMoodSadDizzy,
  IconCategoryPlus
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuCategoryId, setMenuCategoryId] = useState<string | null>(null)
  const { data: categoriesData, isLoading, error } = useGetAllCategories({
    page,
    take: rowsPerPage,
    order: "DESC",
    search: searchTerm
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, categoryId: string) => {
    setAnchorEl(event.currentTarget);
    setMenuCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCategoryId(null);
  };

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
        <Box className="flex items-center justify-center">
          <IconButton
            onClick={(e) => handleMenuOpen(e, category.id)}
            size="medium"
          >
            <IconDotsVertical size={18} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuCategoryId === category.id}
            onClose={handleMenuClose}
            PaperProps={{
              className: "!rounded-[6px] shadow-xl",
            }}
          >
            <MenuItem onClick={() => {
              handleView(category.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                <IconEye size={16} className="text-blue-400" />
                <span>Xem chi tiết</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              openDeleteDialog(category.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                <IconTrash size={16} className="text-red-400" />
                <span>Xóa</span>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  )

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen gap-2 p-8 text-center">
        <IconMoodSadDizzy size={48} className="text-gray-400" />
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải danh mục
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }
  return (
    <>
      <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconCategoryPlus size={36} className="text-main-golden-orange" />
          </Box>
          <Typography variant="h3" className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue">
            Quản lý danh mục
          </Typography>
        </Box>
      </Box>
      <Box>
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
                className="flex-1 bg-white rounded shadow-sm"
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
      </Box>
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
            variant="outlined"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteCategory.isPending}
          >
            {deleteCategory.isPending ?
              <div className="flex items-center gap-2 !text-white">
                <CircularProgress size={16} className="!text-white" />
                Đang xóa...
              </div> : <span className="!text-white">Xóa</span>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
} 