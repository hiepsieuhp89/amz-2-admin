"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material"
import {
  IconSearch,
  IconPlus,
  IconUsers,
  IconEdit,
  IconTrash,
  IconEye,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteUser, useGetAllUsers } from "@/hooks/user"

function UsersPage() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")

  const { data, isLoading, error } = useGetAllUsers({ 
    page, 
    limit, 
    search: searchTerm,
    role: roleFilter,
    status: statusFilter
  })
  const deleteUserMutation = useDeleteUser()

  const handleCreateNew = () => {
    router.push("/admin/users/create-new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/users/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    try {
      await deleteUserMutation.mutateAsync(userToDelete)
      message.success("Người dùng đã được xóa thành công!")
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (error) {
      message.error("Không thể xóa người dùng. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredUsers = data?.data || []

  if (error) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải danh sách người dùng
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <IconUsers size={28} className="mr-3 text-main-golden-orange" />
          <Typography
            fontSize={18}
            fontWeight={700}
            variant="h5"
            className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
          >
            Quản lý người dùng
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm người dùng..."
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
            Tạo người dùng mới
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : filteredUsers.length === 0 ? (
        <Box className="flex flex-col items-center justify-center gap-4 py-8 text-center border border-gray-700 border-dashed rounded-lg backdrop-blur-sm">
          <Typography
            fontWeight={400}
            variant="h6"
            className="mb-2 text-gray-400"
          >
            Không tìm thấy người dùng nào. {searchTerm ? "Thử tìm kiếm với từ khác" : "Tạo người dùng đầu tiên"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="outlined"
              startIcon={<IconPlus size={18} />}
              onClick={handleCreateNew}
              className="transition-all w-fit !normal-case"
            >
              Tạo người dùng mới
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid #E0E0E0' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="users table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Tên đăng nhập</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Họ tên</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Số điện thoại</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Vai trò</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Trạng thái</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Số dư</TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 600 }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        '&:first-child td, &:first-child th': { borderTop: '1px solid #E0E0E0' },
                        '& td': { borderBottom: '1px solid #E0E0E0' }
                      }}
                    >
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role === 'admin' ? 'Admin' : user.role === 'seller' ? 'Người bán' : 'Người dùng'}
                          color={user.role === 'admin' ? 'primary' : user.role === 'seller' ? 'warning' : 'info'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? "Đang hoạt động" : "Đã khóa"}
                          color={user.isActive ? "success" : "error"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{user.balance?.toLocaleString()} VND</TableCell>
                      <TableCell>
                        <Box className="flex items-center justify-center gap-4">
                          <IconButton
                            onClick={() => handleView(user.id)}
                            size="medium"
                            className="!bg-blue-100"
                          >
                            <IconEye size={18} className="text-blue-400" />
                          </IconButton>
                          <IconButton
                            onClick={() => openDeleteDialog(user.id)}
                            size="medium"
                            className="!bg-red-100"
                          >
                            <IconTrash size={18} className="text-red-400" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 8, 10, 25]}
              component="div"
              count={data?.totalItems || 0}
              rowsPerPage={limit}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </Paper>
        </>
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
            Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác.
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

export default UsersPage; 