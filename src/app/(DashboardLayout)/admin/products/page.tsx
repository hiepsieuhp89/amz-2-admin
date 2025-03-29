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
  CircularProgress,
  ButtonGroup,
  Paper,
  Switch
} from "@mui/material"
import {
  IconEye,
  IconSearch,
  IconTrash,
  IconList,
  IconTable,
  IconPlus
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
import { useDeleteProduct, useGetAllProducts, useUpdateProduct } from "@/hooks/product"

function ProductsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  const { data: productData, isLoading, error } = useGetAllProducts({
    page,
    take: rowsPerPage,
    search: searchTerm
  })
  const deleteProductMutation = useDeleteProduct()
  const updateProductMutation = useUpdateProduct()

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

  const handleToggleHot = async (id: string, isHot: boolean) => {
    try {
      await updateProductMutation.mutateAsync({
        id,
        payload: { isHot }
      })
      message.success(`Sản phẩm đã được ${isHot ? 'đánh dấu' : 'bỏ đánh dấu'} nổi bật!`)
    } catch (error) {
      message.error("Không thể cập nhật trạng thái nổi bật. Vui lòng thử lại.")
      console.error(error)
    }
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
    { key: 'isHot', label: 'Nổi bật' },
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
      <TableCell>
        <Switch
          checked={product.isHot}
          onChange={() => handleToggleHot(product.id, !product.isHot)}
          color="primary"
        />
      </TableCell>
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
      <Box>
        <Box sx={{ 
          padding: 3,
          paddingBottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm sản phẩm..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} className="text-main-golden-orange" />
                  </InputAdornment>
                ),
                className: "text-white rounded-lg hover:shadow-md transition-shadow",
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              endIcon={<IconPlus size={18} />}
              variant="contained"
              onClick={handleCreateNew}
              className="text-white transition-colors !normal-case"
            >
              Tạo sản phẩm mới
            </Button>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                variant={viewMode === 'table' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('table')}
                startIcon={<IconList />}
              >
                Bảng
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('grid')}
                startIcon={<IconTable />}
              >
                Lưới
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {viewMode === 'table' ? (
          <DataTable
            columns={columns}
            data={filteredProducts}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={setPage}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage)
              setPage(1)
            }}
            renderRow={renderRow}
            emptyMessage="Không tìm thấy sản phẩm nào"
          />
        ) : (
          <Box className="grid grid-cols-2 gap-4 p-6 pt-12 mb-10 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.length === 0 ? (
              <Box className="flex items-center justify-center h-full col-span-3">
                <Typography variant="h6">Không tìm thấy sản phẩm nào</Typography>
              </Box>
            ) : (
              filteredProducts.map((product) => (
                <Box key={product.id} className="overflow-hidden transition-shadow border !rounded-[8px] shadow-sm hover:shadow-md">
                  <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      {product.imageUrl && (
                        <Box
                          component="img"
                          src={product.imageUrl}
                          alt={product.name}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleImageClick(product.imageUrl)}
                        />
                      )}
                      <Box sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: '#FEF5E5',
                        color: '#FCAF17',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        px: 1,
                        py: 0.5,
                        borderRadius: '4px'
                      }}>
                        Trong kho: {product.stock}
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {product.name.slice(0, 50)}
                      {product.name.length > 50 && "..."}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 2 }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <span>Giá:</span>
                        <span className="!text-green-500">${product.price}</span>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <span>Giá khuyến mãi:</span>
                        <span className="!text-amber-500">${product.salePrice || '-'}</span>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleView(product.id)}
                        startIcon={<IconEye size={16} />}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => openDeleteDialog(product.id)}
                        startIcon={<IconTrash size={16} />}
                      >
                        Xóa
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
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