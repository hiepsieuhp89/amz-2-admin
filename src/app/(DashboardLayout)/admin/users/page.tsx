"use client"
import DataTable from "@/components/DataTable"
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress
} from "@mui/material"
import { IconCopy, IconEye, IconSearch, IconTrash } from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { useDeleteUser, useGetAllUsers } from "@/hooks/user"

function UsersPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const { data: userData, isLoading, error } = useGetAllUsers({
    page,
    take: rowsPerPage,
    order: "DESC",
  })
  const filteredUsers = userData?.data?.data || []
  const pagination = userData?.data?.meta || {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  }
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

  const columns = [
    { key: 'stt', label: 'STT' },
    { key: 'email', label: 'Email' },
    { key: 'username', label: 'Tên đăng nhập' },
    { key: 'fullName', label: 'Họ tên' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'referralCode', label: 'Mã giới thiệu' },
    { key: 'shopName', label: 'Tên shop' },
    { key: 'shopAddress', label: 'Địa chỉ shop' },
    { key: 'role', label: 'Vai trò' },
    { key: 'isActive', label: 'Trạng thái' },
    { key: 'balance', label: 'Số dư' },
    { key: 'fedexBalance', label: 'Số dư Fedex' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'bankName', label: 'Ngân hàng' },
    { key: 'bankAccountNumber', label: 'Số tài khoản' },
    { key: 'bankAccountName', label: 'Tên tài khoản' },
    { key: 'bankBranch', label: 'Chi nhánh' },
    { key: 'sellerPackageName', label: 'Gói Seller' },
    { key: 'sellerPackageExpiry', label: 'Hết hạn Seller' },
    { key: 'spreadPackageName', label: 'Gói Spread' },
    { key: 'spreadPackageExpiry', label: 'Hết hạn Spread' },
    { key: 'actions', label: 'Thao tác' },
  ];

  const renderRow = (user: any, index: number) => (
    <TableRow
      key={user.id}
      sx={{
        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
        "& td": { borderBottom: "1px solid #E0E0E0" },
        backgroundColor: index % 2 !== 1 ? '#F5F5F5' : '#FFFFFF'
      }}
    >
      <TableCell>{(page - 1) * rowsPerPage + filteredUsers.indexOf(user) + 1}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {user.email}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(user.email || "");
              message.success(`Đã sao chép email: ${user.email}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500"/>
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {user.phone}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(user.phone || "");
              message.success(`Đã sao chép số điện thoại: ${user.phone}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500"/>
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {user.referralCode}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(user.referralCode || "");
              message.success(`Đã sao chép mã giới thiệu: ${user.referralCode}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500"/>
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>{user.shopName}</TableCell>
      <TableCell>{user.shopAddress}</TableCell>
      <TableCell>
        <Chip
          label={
            user.role === "admin" ? "Admin" :
              user.role === "seller" ? "Người bán" :
                "Người dùng"
          }
          color={
            user.role === "admin" ? "primary" :
              user.role === "seller" ? "warning" :
                "success"
          }
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
      <TableCell>{user.fedexBalance?.toLocaleString()} VND</TableCell>
      <TableCell>{[user.address, user.ward, user.district, user.city].filter(Boolean).join(', ')}</TableCell>
      <TableCell>{user.bankName}</TableCell>
      <TableCell>{user.bankAccountNumber}</TableCell>
      <TableCell>{user.bankAccountName}</TableCell>
      <TableCell>{user.bankBranch}</TableCell>
      <TableCell>{user.sellerPackage?.name || ''}</TableCell>
      <TableCell>
        {user.sellerPackageExpiry ? 
          new Date(user.sellerPackageExpiry).toLocaleDateString() : 
          ''
        }
      </TableCell>
      <TableCell>{user.spreadPackage?.name || ''}</TableCell>
      <TableCell>
        {user.spreadPackageExpiry ? 
          new Date(user.spreadPackageExpiry).toLocaleDateString() : 
          ''
        }
      </TableCell>
      <TableCell>
        <Box className="flex items-center justify-center gap-4">
          <IconButton onClick={() => handleView(user.id)} size="medium" className="!bg-blue-100">
            <IconEye size={18} className="text-blue-400" />
          </IconButton>
          <IconButton onClick={() => openDeleteDialog(user.id)} size="medium" className="!bg-red-100">
            <IconTrash size={18} className="text-red-400" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

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
    <>
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <DataTable
          columns={columns}
          data={filteredUsers}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={setPage}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage);
            setPage(1);
          }}
          renderRow={renderRow}
          emptyMessage="Không tìm thấy người dùng nào"
          createNewButton={{
            label: "Tạo người dùng mới",
            onClick: handleCreateNew
          }}
          searchComponent={
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
        <DialogTitle fontSize={18}>
          Xác nhận xóa người dùng
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
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
    </>
  )
}

export default UsersPage

