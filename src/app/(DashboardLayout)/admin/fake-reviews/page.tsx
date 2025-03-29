"use client"
import DataTable from "@/components/DataTable"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableFooter,
  Paper,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material"
import { IconEye, IconChevronDown, IconChevronUp, IconPhoto } from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useGetAllUsers } from "@/hooks/user"
import { useGetUserOrders, useCreateFakeReview } from "@/hooks/fake-review"
import { CircularProgress } from "@mui/material"
import { useUploadImage } from "@/hooks/image"

function FakeReviewsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState<string>('DELIVERED')
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])

  const { data: userData, isLoading, error } = useGetAllUsers({
    page,
    take: rowsPerPage,
    order: "DESC",
    role: "user"
  })

  const { data: orders, isLoading: isOrdersLoading, refetch } = useGetUserOrders(selectedUserId || '', orderStatus)
  const { mutate: createReview, isPending: isCreatingReview } = useCreateFakeReview()
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage()

  console.log("orders", orders)
  const filteredUsers = userData?.data?.data || []
  const pagination = userData?.data?.meta || {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  }

  const columns = [
    { key: 'stt', label: 'STT' },
    { key: 'fullName', label: 'Họ tên' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'actions', label: 'Thao tác' },
  ]

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
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{[user.address, user.ward, user.district, user.city].filter(Boolean).join(', ')}</TableCell>
      <TableCell>
        <Box className="flex items-center justify-center gap-4">
          <IconButton 
            onClick={() => {
              setSelectedUserId(user.id)
              setOrdersDialogOpen(true)
            }} 
            size="medium" 
            className="!bg-blue-100"
          >
            <IconEye size={18} className="text-blue-400" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )

  const handleCreateReview = (orderId: string) => {
    setSelectedOrderId(orderId)
    setReviewDialogOpen(true)
  }

  const handleOrderStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value)
    refetch()
  }

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const renderOrderItems = (items: any[]) => {
    return (
      <Box sx={{ pl: 4, pt: 2 }}>
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
            <img 
              src={item.productImage} 
              alt={item.productName} 
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
            <Box>
              <Typography variant="body2">{item.productName}</Typography>
              <Typography variant="body2" color="textSecondary">
                Số lượng: {item.quantity}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  const renderOrdersDialogContent = () => {
    if (!selectedUserId) return null

    if (isOrdersLoading) {
      return <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    }

    if (!orders?.data?.length) {
      return <Typography>Không có đơn hàng nào</Typography>
    }

    return (
      <Box>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Chọn đơn hàng để tạo review
          </Typography>
          
          <Box>
            <select 
              value={orderStatus}
              onChange={handleOrderStatusChange}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              {/* <option value="">Tất cả</option> */}
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="SHIPPING">SHIPPING</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.data.map((order: any) => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          onClick={() => handleCreateReview(order.id)}
                          disabled={order.hasReview}
                        >
                          {order.hasReview ? 'Đã đánh giá' : 'Tạo review'}
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => toggleExpandOrder(order.id)}
                        >
                          {expandedOrderId === order.id ? (
                            <IconChevronUp size={18} />
                          ) : (
                            <IconChevronDown size={18} />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  {expandedOrderId === order.id && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        {renderOrderItems(order.items)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  const handleOpenReviewDialog = (orderId: string) => {
    setSelectedOrderId(orderId)
    setReviewDialogOpen(true)
  }

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false)
    setRating(5)
    setContent("")
    setImages([])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const formData = new FormData()
      formData.append("file", file)

      uploadImage({ file: file }, {
        onSuccess: (response) => {
          setImages((prev) => [...prev, response.data.url])
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi tải ảnh lên")
        }
      })
    })
  }

  const handleSubmitReview = () => {
    if (!selectedUserId || !selectedOrderId) return

    createReview({
      userId: selectedUserId,
      orderId: selectedOrderId,
      rating,
      content,
      images
    }, {
      onSuccess: () => {
        message.success("Tạo review thành công!")
        handleCloseReviewDialog()
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi tạo review")
      }
    })
  }

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
      <Box sx={{ width: '100%' }}>
        <DataTable
          columns={columns}
          data={filteredUsers}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={setPage}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage)
            setPage(1)
          }}
          renderRow={renderRow}
          emptyMessage="Không tìm thấy người dùng nào"
        />
      </Box>

      <Dialog
        open={ordersDialogOpen}
        onClose={() => setOrdersDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Danh sách đơn hàng của người dùng</DialogTitle>
        <DialogContent>
          {renderOrdersDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrdersDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={reviewDialogOpen}
        onClose={handleCloseReviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Viết đánh giá</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box mb={3}>
              <Typography variant="body1" gutterBottom>
                Đánh giá của bạn
              </Typography>
              <Rating
                value={rating}
                onChange={(_, value) => setRating(value || 5)}
                size="large"
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nội dung đánh giá"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Box>

            <Box mb={3}>
              <InputLabel>Hình ảnh</InputLabel>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={handleImageUpload}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconPhoto />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {isUploading && <CircularProgress size={24} />}
              <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Review image ${index}`}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            disabled={isCreatingReview}
          >
            {isCreatingReview ? 'Đang tạo...' : 'Gửi đánh giá'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FakeReviewsPage 