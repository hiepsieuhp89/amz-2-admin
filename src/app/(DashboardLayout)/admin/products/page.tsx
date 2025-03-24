"use client"
import {
  Box,
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

import DataTable from "@/components/DataTable"
import { useDeleteProduct, useGetAllProducts } from "@/hooks/product"

function ProductsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const { data: productData, isLoading, error } = useGetAllProducts({
    page,
    take: rowsPerPage,
    search: searchTerm
  })
  const deleteProductMutation = useDeleteProduct()

  const handleCreateNew = () => {
    router.push("/admin/products/create-new")
  }

  const handleView = (id: string) => {
    router.push(`/admin/products/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    try {
      await deleteProductMutation.mutateAsync(productToDelete)
      message.success("Sản phẩm đã được xóa thành công!")
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    } catch (error) {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.")
      console.error(error)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  const filteredProducts = productData?.data?.data || []
  const pagination = productData?.data?.meta || {
    page: 1,
    take: 8,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  }

  const columns = [
    { key: 'name', label: 'Tên sản phẩm' },
    { key: 'price', label: 'Giá (USD)' },
    { key: 'salePrice', label: 'Giá khuyến mãi' },
    { key: 'imageUrl', label: 'Hình ảnh' },
    { key: 'stock', label: 'Số lượng' },
    { key: 'category', label: 'Danh mục' },
    { key: 'actions', label: 'Thao tác' },
  ];

  const renderRow = (product: any) => (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.salePrice || '-'}</TableCell>
      <TableCell>
        {product.imageUrl ? (
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          <Box sx={{ color: 'text.secondary' }}>N/A</Box>
        )}
      </TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.category?.name || '-'}</TableCell>
      <TableCell>
        <Box className="flex items-center justify-center gap-4">
          <IconButton
            onClick={() => handleView(product.id)}
            size="medium"
            className="!bg-blue-100"
          >
            <IconEye size={18} className="text-blue-400" />
          </IconButton>
          <IconButton
            onClick={() => openDeleteDialog(product.id)}
            size="medium"
            className="!bg-red-100"
          >
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
          Lỗi khi tải danh sách sản phẩm
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={filteredProducts}
      isLoading={isLoading}
      pagination={pagination}
      onPageChange={setPage}
      onRowsPerPageChange={(newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
      }}
      renderRow={renderRow}
      emptyMessage="Không tìm thấy sản phẩm nào"
      createNewButton={{
        label: "Tạo sản phẩm mới",
        onClick: handleCreateNew
      }}
      searchComponent={
        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm sản phẩm..."
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

export default ProductsPage; 