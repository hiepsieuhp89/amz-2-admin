"use client"
import {
  Box,
  Button,
  Chip,
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
  IconBrandTelegram,
  IconEye,
  IconMoodSadDizzy,
  IconPackages,
  IconPlus,
  IconSearch,
  IconTrash
} from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import DataTable from "@/components/DataTable"
import { useDeleteSpreadPackage, useGetAllSpreadPackages } from "@/hooks/spread-package"

function SpreadPackagesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null)

  const { data, isLoading, error } = useGetAllSpreadPackages()
  const deletePackageMutation = useDeleteSpreadPackage()
  const handleCreateNew = () => {
    router.push("/admin/spread-packages/create-new")
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/spread-packages/edit?id=${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/admin/spread-packages/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setPackageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return

    try {
      await deletePackageMutation.mutateAsync(packageToDelete)
      message.success("Gói quảng bá đã được xóa thành công!")
      setDeleteDialogOpen(false)
      setPackageToDelete(null)
    } catch (error) {
      message.error("Không thể xóa gói quảng bá. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const filteredPackages = data?.data.filter((pkg) => pkg.name.toLowerCase().includes(searchTerm.toLowerCase())) || []

  const columns = [
    { key: 'name', label: 'Tên gói' },
    { key: 'price', label: 'Giá (USD)' },
    { key: 'description', label: 'Mô tả' },
    { key: 'image', label: 'Hình ảnh' },
    { key: 'isActive', label: 'Trạng thái' },
    { key: 'duration', label: 'Thời hạn (ngày)' },
    { key: 'createdAt', label: 'Ngày tạo' },
    { key: 'actions', label: 'Thao tác' },
  ]

  const renderRow = (pkg: any) => (
    <TableRow key={pkg.id}>
      <TableCell>{pkg.name}</TableCell>
      <TableCell>{pkg.price}</TableCell>
      <TableCell>{pkg.description}</TableCell>
      <TableCell>
        {pkg.image ? (
          <Box
            component="img"
            src={pkg.image}
            alt={pkg.name}
            sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          <Box sx={{ color: 'text.secondary' }}>N/A</Box>
        )}
      </TableCell>
      <TableCell>
        <Chip
          label={pkg.isActive ? "Đang hoạt động" : "Đã dừng"}
          color={pkg.isActive ? "success" : "error"}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell>{pkg.duration}</TableCell>
      <TableCell>{new Date(pkg.createdAt).toLocaleDateString('vi-VN')}</TableCell>
      <TableCell>
        <Box className="flex items-center justify-center gap-4">
          <IconButton onClick={() => handleView(pkg.id)} size="medium" className="!bg-blue-100">
            <IconEye size={18} className="text-blue-400" />
          </IconButton>
          <IconButton onClick={() => openDeleteDialog(pkg.id)} size="medium" className="!bg-red-100">
            <IconTrash size={18} className="text-red-400" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen gap-2 p-8 text-center">
        <IconMoodSadDizzy size={48} className="text-gray-400" />
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải gói quảng bá
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <div>
      <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconPackages size={36} className="text-main-golden-orange" />
          </Box>
          <Typography variant="h3" className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue">
            Quản lý gói quảng bá
          </Typography>
        </Box>
      </Box>
      <DataTable
        columns={columns}
        data={filteredPackages}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="Không tìm thấy gói quảng bá nào"
        createNewButton={{
          label: "Tạo gói quảng bá mới",
          onClick: handleCreateNew
        }}
        searchComponent={
          <div className="flex items-center gap-4">
            <TextField
              size="small"
              placeholder="Tìm kiếm gói quảng bá..."
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
            Bạn có chắc chắn muốn xóa gói quảng bá này không? Hành động này không thể hoàn tác.
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

export default SpreadPackagesPage; 