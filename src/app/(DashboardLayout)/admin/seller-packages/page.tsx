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
  Typography
} from "@mui/material"
import {
  IconEye,
  IconSearch,
  IconTrash
} from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import "yet-another-react-lightbox/styles.css"

import { useDeleteSellerPackage, useGetAllSellerPackages } from "@/hooks/seller-package"

function SellerPackagesPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  const { data, isLoading, error } = useGetAllSellerPackages({ page, limit })
  const deletePackageMutation = useDeleteSellerPackage()
  const handleCreateNew = () => {
    router.push("/admin/seller-packages/create-new")
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/seller-packages/edit?id=${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/admin/seller-packages/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setPackageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return

    try {
      await deletePackageMutation.mutateAsync(packageToDelete)
      message.success("Seller package deleted successfully!")
      setDeleteDialogOpen(false)
      setPackageToDelete(null)
    } catch (error) {
      message.error("Failed to delete seller package. Please try again.")
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

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
    setLightboxOpen(true)
  }

  const filteredPackages = data?.data.filter((pkg) => pkg.name.toLowerCase().includes(searchTerm.toLowerCase())) || []

  const columns = [
    { key: 'name', label: 'Tên gói' },
    { key: 'price', label: 'Giá (USD)' },
    { key: 'description', label: 'Mô tả' },
    { key: 'image', label: 'Hình ảnh' },
    { key: 'isActive', label: 'Trạng thái' },
    { key: 'duration', label: 'Thời hạn (ngày)' },
    { key: 'percentProfit', label: 'Lợi nhuận (%)' },
    { key: 'maxProducts', label: 'Sản phẩm tối đa' },
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
            sx={{ 
              width: 50, 
              height: 50, 
              objectFit: 'cover', 
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 8px rgba(0,0,0,0.2)'
              }
            }}
            onClick={() => openLightbox(pkg.image)}
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
      <TableCell>{pkg.percentProfit}%</TableCell>
      <TableCell>{pkg.maxProducts}</TableCell>
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
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Error loading seller packages
        </Typography>
        <Typography className="text-gray-400">{error.message || "Please try again later"}</Typography>
      </Box>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={filteredPackages}
      isLoading={isLoading}
      pagination={{
        page,
        take: limit,
        itemCount: data?.data.length || 0,
      }}
      onPageChange={(newPage) => setPage(newPage)}
      onRowsPerPageChange={(newRowsPerPage) => {
        setLimit(newRowsPerPage)
        setPage(0)
      }}
      renderRow={renderRow}
      emptyMessage="Không tìm thấy gói bán hàng nào"
      createNewButton={{
        label: "Tạo gói bán hàng mới",
        onClick: handleCreateNew
      }}
      searchComponent={
        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm gói bán hàng..."
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
  )
}

export default SellerPackagesPage;
