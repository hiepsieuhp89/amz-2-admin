"use client"
import {
  Box,
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
import {
  IconEye,
  IconSearch,
  IconTrash
} from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { Lightbox } from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Download from "yet-another-react-lightbox/plugins/download"

import DataTable from "@/components/DataTable"
import { useDeleteProduct, useGetAllProducts } from "@/hooks/product"

function ProductsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  const { data: productData, isLoading, error } = useGetAllProducts({
    page,
    take: rowsPerPage,
    search: searchTerm
  })
  console.log(productData)
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

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
    setLightboxOpen(true)
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

  const renderRow = (product: any, index: number) => (
    <TableRow
      key={product.id}
      sx={{
        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
        "& td": { borderBottom: "1px solid #E0E0E0" },
        backgroundColor: index % 2 !== 1 ? '#F5F5F5' : '#FFFFFF'
      }}
    >
      <TableCell sx={{ maxWidth: '200px', wordWrap: 'break-word' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.name}
        </Typography>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.salePrice || '-'}</TableCell>
      <TableCell>
        {product.imageUrl ? (
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{ 
              width: 50, 
              height: 50, 
              objectFit: 'cover', 
              borderRadius: '4px',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={() => handleImageClick(product.imageUrl)}
          />
        ) : (
          <Box sx={{ color: 'text.secondary' }}>N/A</Box>
        )}
      </TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.category?.name || '-'}</TableCell>
      <TableCell>
        <Box className="flex items-center gap-2">
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
    <>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle fontSize={18}>
          Xác nhận xóa sản phẩm
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
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
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ?
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div> : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: currentImage }]}
        plugins={[Zoom, Download]}
      />
    </>
  )
}

export default ProductsPage; 