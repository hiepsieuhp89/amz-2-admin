"use client"

import type React from "react"

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
} from "@mui/material"
import { Empty } from "antd"
import Image from "next/image"
import {
  IconSearch,
  IconCopyCheck,
  IconMapPinPin,
  IconAlertCircle,
  IconMail,
  IconTrash,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react"
import styles from "./storehouse.module.scss"

interface OrderSectionProps {
  searchUser: string
  handleSearchUser: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOpenDialog: () => void
  validUsers: any
  handleSelectUser: (user: any) => void
  getCustomerColor: (customer: any) => any
  totalSelectedProducts: number
  selectedProducts: any[]
  quantities: { [key: string]: number }
  handleQuantityChange: (productId: string, delta: number) => void
  removeProduct: (index: number) => void
  handleCreateFakeOrder: () => void
  selectedUser: any
}

const OrderSection = ({
  searchUser,
  handleSearchUser,
  handleOpenDialog,
  validUsers,
  handleSelectUser,
  getCustomerColor,
  totalSelectedProducts,
  selectedProducts,
  quantities,
  handleQuantityChange,
  removeProduct,
  handleCreateFakeOrder,
  selectedUser,
}: OrderSectionProps) => {
  const checkImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "https://picsum.photos/800/600"
    if (imageUrl.includes("example.com")) {
      return "https://picsum.photos/800/600"
    }
    return imageUrl
  }

  return (
    <Box className="md:w-[400px]">
      {/* Customer Search */}
      <Box className="flex items-center gap-2 mb-3">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-product">Tìm khách ảo (Tên, email, sdt)</InputLabel>
          <OutlinedInput
            size="small"
            id="outlined-adornment-product"
            value={searchUser}
            onChange={handleSearchUser}
            startAdornment={
              <InputAdornment position="start">
                <IconSearch className="w-4 h-4" />
              </InputAdornment>
            }
            label="Tìm khách ảo (Tên, email, sdt)"
          />
        </FormControl>
        <IconButton
          sx={{
            height: "36px",
            width: "36px",
            backgroundColor: "#5D87FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4570EA",
            },
          }}
          size="small"
          className="flex-shrink-0 !rounded-[4px]"
        >
          <IconCopyCheck className="w-5 h-5" />
        </IconButton>
        <IconButton
          sx={{
            height: "36px",
            width: "36px",
            backgroundColor: "#5D87FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4570EA",
            },
          }}
          size="small"
          className="flex-shrink-0 !rounded-[4px]"
          onClick={handleOpenDialog}
        >
          <IconMapPinPin className="w-5 h-5" />
        </IconButton>
      </Box>

      {/* Customer List */}
      {validUsers && validUsers.data.data.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                backgroundColor: "#FDEDE8",
                borderRadius: "4px",
                color: "#FB9F87",
              }}
            >
              <IconAlertCircle className="w-4 h-4" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#FB9F87" }}>
              Vui lòng chọn khách ảo trước khi đặt hàng !
            </Typography>
          </Box>
          <Box sx={{ maxHeight: "40%", overflow: "auto", mb: 2, border: "1px solid #e0e0e0", borderRadius: "4px" }}>
            <List>
              {validUsers.data.data.map((user: any, index: number) => (
                <ListItem
                  key={user.id}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: index % 2 !== 0 ? "#f5f5f5" : "inherit",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                    borderBottom: "1px solid #e0e0e0",
                    padding: "8px 16px",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                  onClick={() => handleSelectUser(user)}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                      fontSize: 16,
                      mr: 2,
                      ...getCustomerColor(user),
                    }}
                  >
                    {user.username?.substring(0, 2).toUpperCase()}
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={500}
                        sx={{ display: "flex", alignItems: "center", color: "#FCAF17", fontSize: "14px" }}
                      >
                        {user.fullName}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ display: "flex", alignItems: "center" }} variant="body2" color="text.secondary">
                        <IconMail className="w-3 h-3 mr-1" /> {user.email}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}

      {/* Order Summary */}
      {totalSelectedProducts > 0 && (
        <Box className="my-3 text-center">
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#3F6AD8" }}>
            Tổng sản phẩm đã chọn ({totalSelectedProducts})
          </Typography>
        </Box>
      )}

      <Card>
        <Box className={styles.selectedProducts}>
          {selectedProducts.length > 0 ? (
            <>
              <List>
                {selectedProducts.map((product, index) => (
                  <ListItem
                    key={`${product.id}-${index}`}
                    sx={{
                      borderBottom: "1px solid #e0e0e0",
                      "&:last-child": {
                        borderBottom: "none",
                      },
                      "&:first-child": {
                        paddingTop: "0px",
                      },
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 0px",
                    }}
                  >
                    <Box className="flex items-start gap-2 ">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                        <Image
                          src={checkImageUrl(product.imageUrl || "")}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-[4px] border flex-shrink-0"
                          width={200}
                          height={200}
                          draggable={false}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body1">
                          {product.name.slice(0, 50) + (product.name.length > 50 ? "..." : "")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description.slice(0, 80) + (product.description.length > 80 ? "..." : "")}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <IconButton
                          size="small"
                          sx={{ border: "2px solid #FDEDE8", bgcolor: "#FDEDE8", mb: 1 }}
                          onClick={() => removeProduct(index)}
                          color="error"
                        >
                          <IconTrash className="w-3 h-3" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          <IconMinus className="w-3 h-3" />
                        </IconButton>
                        <Box sx={{ minWidth: "30px", textAlign: "center" }}>{quantities[product.id] || 1}</Box>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          <IconPlus className="w-3 h-3" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", mt: 1, width: "100%", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <span className="font-semibold text-main-gunmetal-blue">Giá bán:</span>
                        <span className="!text-green-500">${Number(product.salePrice).toFixed(2)}</span>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <span className="font-semibold text-main-gunmetal-blue">Giá nhập:</span>
                        <span className="!text-amber-500">${Number(product.price).toFixed(2)}</span>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <span className="font-semibold text-main-gunmetal-blue">Lợi nhuận:</span>
                        <span className="!text-red-500 font-bold">
                          ${(Number(product.salePrice) - Number(product.price)).toFixed(2)}
                        </span>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
              <OrderSummaryTotals selectedProducts={selectedProducts} quantities={quantities} />
            </>
          ) : (
            <Box className="flex items-center justify-center h-[20%] col-span-3">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Chưa có sản phẩm nào được chọn."} />
            </Box>
          )}
        </Box>
      </Card>
      <Box className="grid grid-cols-2 gap-2 mt-4">
        <FormControl fullWidth>
          <InputLabel>Trạng thái đơn hàng</InputLabel>
          <Select size="small" label="Trạng thái đơn hàng" defaultValue="pending">
            <MenuItem value="pending">Đang chờ xử lý</MenuItem>
            <MenuItem value="confirmed">Đã xác nhận</MenuItem>
            <MenuItem value="shipping">Đang trên đường đi</MenuItem>
            <MenuItem value="delivered">Đã giao hàng</MenuItem>
          </Select>
        </FormControl>

        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleCreateFakeOrder}
          disabled={selectedProducts.length === 0 || !selectedUser}
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  )
}

interface OrderSummaryTotalsProps {
  selectedProducts: any[]
  quantities: { [key: string]: number }
}

const OrderSummaryTotals = ({ selectedProducts, quantities }: OrderSummaryTotalsProps) => {
  const subtotal = selectedProducts.reduce((sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1), 0)
  const tax = subtotal * 0.08
  const shipping = 5
  const total = subtotal * 1.08 + shipping

  return (
    <Box sx={{ width: "100%", pt: 2, borderTop: "1px solid #e0e0e0" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
          Tổng:
        </Typography>
        <span className="font-normal text-gray-400">${subtotal.toFixed(2)}</span>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
          Thuế (8%):
        </Typography>
        <span className="font-normal text-gray-400">${tax.toFixed(2)}</span>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
          Đang chuyển hàng:
        </Typography>
        <span className="font-normal text-gray-400">${shipping.toFixed(2)}</span>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
          Giảm giá:
        </Typography>
        <span className="font-normal text-gray-400">$0.00</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          pt: 2,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography fontSize="14px" sx={{ fontWeight: 700, color: "#2c3e50" }}>
          Toàn bộ:
        </Typography>

        <Box className="h-6 bg-[#E6F9FF] text-[#22E0BE] font-normal rounded-[4px] px-2 text-sm flex items-center justify-center border-none">
          ${total.toFixed(2)}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderSection

