"use client"

import type React from "react"

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material"
import { Empty, Spin } from "antd"
import Image from "next/image"
import { IconSearch, IconMail, IconPhone, IconMapPin, IconCalendar, IconBuildingStore } from "@tabler/icons-react"

interface ShopSectionProps {
  keyword: string
  setKeyword: (value: string) => void
  minPrice: number | undefined
  setMinPrice: (value: number | undefined) => void
  maxPrice: number | undefined
  setMaxPrice: (value: number | undefined) => void
  searchShop: string
  handleSearchShop: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoadingShops: boolean
  shopsData: any
  handlePopoverOpen: (event: React.MouseEvent<HTMLElement>) => void
  handlePopoverClose: () => void
  handleCustomerSelect: (customer: any) => void
  getCustomerColor: (customer: any) => any
  hoveredCustomer: any
  anchorEl: HTMLElement | null
  open: boolean
}

const ShopSection = ({
  keyword,
  setKeyword,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchShop,
  handleSearchShop,
  isLoadingShops,
  shopsData,
  handlePopoverOpen,
  handlePopoverClose,
  handleCustomerSelect,
  getCustomerColor,
  hoveredCustomer,
  anchorEl,
  open,
}: ShopSectionProps) => {
  console.log(shopsData?.data?.data)
  return (
    <>
      {/* Filters */}
      <Box className="grid justify-between grid-cols-2 gap-2 mb-3 md:grid-cols-4">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Tìm shop</InputLabel>
          <OutlinedInput
            value={searchShop}
            onChange={handleSearchShop}
            size="small"
            id="outlined-adornment-email"
            startAdornment={
              <InputAdornment position="start">
                <IconSearch className="w-4 h-4" />
              </InputAdornment>
            }
            label="Tìm shop"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-product">Tìm sản phẩm</InputLabel>
          <OutlinedInput
            size="small"
            id="outlined-adornment-product"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconSearch className="w-4 h-4" />
              </InputAdornment>
            }
            label="Tìm sản phẩm"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <TextField
            size="small"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
            label="Giá bắt đầu"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <TextField
            size="small"
            id="outlined-adornment-maxprice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            label="Giá kết thúc"
          />
        </FormControl>
      </Box>

      {/* Shop List */}
      {isLoadingShops && searchShop ? (
        <Box className="flex items-center justify-center h-[20%] col-span-3">
          <Spin size="default" />
        </Box>
      ) : !shopsData?.data?.data || shopsData.data.data.length === 0 ? (
        <Box className="flex items-center justify-center h-[10%]">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={searchShop ? "Không tìm thấy shop phù hợp." : "Chưa có shop nào. Vui lòng nhập tìm kiếm shop."}
          />
        </Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                backgroundColor: "#ECF2FF",
                borderRadius: "4px",
                color: "#5D87FF",
              }}
            >
              <IconBuildingStore className="w-4 h-4" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#3F6AD8" }}>
              Các Shop hiện có ({shopsData.data.data.length}). Vui lòng nhấn chọn một Shop để hiển thị sản phẩm.
            </Typography>
          </Box>
          <Box sx={{ maxHeight: "60vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "4px" }}>
            <List>
              {shopsData.data.data.map((shop: any, index: number) => (
                <ListItem
                  key={shop.id}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.dataset.customer = JSON.stringify(shop)
                    handlePopoverOpen(e)
                  }}
                  onMouseLeave={handlePopoverClose}
                  onClick={() => handleCustomerSelect(shop)}
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
                      ...getCustomerColor(shop),
                    }}
                  >
                    {shop.shopName?.substring(0, 2).toUpperCase()}
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={500}
                        sx={{ display: "flex", alignItems: "center", color: "#FCAF17", fontSize: "16px" }}
                      >
                        {shop.shopName}
                        <Box
                          component="div"
                          sx={{
                            height: 20,
                            width: 20,
                            position: "relative",
                            display: "inline-block",
                            ml: 1,
                          }}
                        >
                          <Image
                            draggable={false}
                            quality={100}
                            height={100}
                            width={100}
                            className="object-cover"
                            src={"/images/logos/tick-icon.png"}
                            alt="tick icon"
                          />
                        </Box>
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ display: "flex", alignItems: "center" }} variant="body2" color="text.secondary">
                        <IconMail className="w-3 h-3 mr-1" /> {shop.email}
                        <IconPhone className="w-3 h-3 ml-1 mr-1" /> {shop.phone}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Shop Popover */}
          <Popover
            sx={{
              pointerEvents: "none",
              "& .MuiPopover-paper": {
                overflow: "visible",
              },
              border: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {hoveredCustomer && (
              <Box
                sx={{
                  p: 2,
                  maxWidth: 320,
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #f0f0f0",
                  position: "relative",
                  borderRadius: "4px",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    left: -8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderRight: "8px solid #ffffff",
                    zIndex: 2,
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    left: -9,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 0,
                    height: 0,
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    borderRight: "9px solid #f0f0f0",
                    zIndex: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: 16,
                      ...getCustomerColor(hoveredCustomer),
                    }}
                  >
                    {hoveredCustomer?.shopName?.substring(0, 2).toUpperCase()}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "16px",
                    }}
                  >
                    {hoveredCustomer.shopName}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#555",
                      fontSize: "14px",
                      "&:hover": { color: "#3F6AD8" },
                    }}
                  >
                    <IconMail className="w-4 h-4 mr-2" style={{ color: "#3F6AD8", flexShrink: 0 }} />
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Email:
                    </Box>
                    <Box component="span" sx={{ ml: 1 }}>
                      {hoveredCustomer.email}
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#555",
                      fontSize: "14px",
                      "&:hover": { color: "#3F6AD8" },
                    }}
                  >
                    <IconPhone className="w-4 h-4 mr-2" style={{ color: "#3F6AD8", flexShrink: 0 }} />
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Phone:
                    </Box>
                    <Box component="span" sx={{ ml: 1 }}>
                      {hoveredCustomer.phone}
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      color: "#555",
                      fontSize: "14px",
                      "&:hover": { color: "#3F6AD8" },
                    }}
                  >
                    <IconMapPin className="w-4 h-4 mr-2" style={{ color: "#3F6AD8", flexShrink: 0 }} />
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Địa chỉ:
                    </Box>
                    <Box component="span" sx={{ ml: 1 }}>
                      {hoveredCustomer.shopAddress}
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#555",
                      fontSize: "14px",
                      mt: 1,
                      pt: 1,
                      borderTop: "1px solid #f5f5f5",
                    }}
                  >
                    <IconCalendar className="w-4 h-4 mr-2" style={{ color: "#FCAF17", flexShrink: 0 }} />
                    <Box component="span" sx={{ fontWeight: 500 }}>
                      Ngày tạo:
                    </Box>
                    <Box component="span" sx={{ ml: 1 }}>
                      {new Date(hoveredCustomer.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            )}
          </Popover>
        </Box>
      )}
    </>
  )
}

export default ShopSection

