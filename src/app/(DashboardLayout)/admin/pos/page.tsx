"use client"

import type React from "react"
import { useState } from "react"
import { Card, message, Empty, Spin } from "antd"
import { useGetAllShopProducts } from "@/hooks/shop-products"
import type { IProduct } from "@/interface/response/product"
import Image from "next/image"
import styles from "./storehouse.module.scss"
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  Popover,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Collapse,
  ListItemIcon,
  Stack,
  TablePagination,
  Radio,
  ButtonGroup,
  Checkbox,
} from "@mui/material"
import {
  IconCopyCheck,
  IconPlus,
  IconSearch,
  IconTrash,
  IconMinus,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconBuildingStore,
  IconBrandProducthunt,
  IconAlertCircle,
  IconMapPinPin,
  IconList,
  IconTable,
} from "@tabler/icons-react"
import { useGetAllUsers, useUpdateUser } from "@/hooks/user"
import { useCreateFakeOrder, useGetValidUsers } from "@/hooks/fake-order"
import { geographicData } from "@/helper/nations"
import type { SelectChangeEvent } from "@mui/material"

const AdminPosPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [searchShop, setSearchShop] = useState("")
  const [selectedShopId, setSelectedShopId] = useState<string>("")
  // Hook
  const { data: shopsData, isLoading: isLoadingShops } = useGetAllUsers({
    role: "shop",
    search: searchShop,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const { data: productsData, isLoading } = useGetAllShopProducts({
    shopId: selectedShopId,
    page: currentPage,
  })
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [customerColors] = useState(new Map())
  const { mutate: createFakeOrder } = useCreateFakeOrder()
  const [showShops, setShowShops] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [searchUser, setSearchUser] = useState("")
  const { data: validUsers } = useGetValidUsers({
    shopProductIds: selectedProducts.map((product) => product.id),
    search: searchUser,
  })
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [hoveredCustomer, setHoveredCustomer] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const updateUserMutation = useUpdateUser()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedShops, setSelectedShops] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    const customer = event.currentTarget.dataset.customer
    if (customer) {
      setAnchorEl(event.currentTarget)
      setHoveredCustomer(JSON.parse(customer))
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setHoveredCustomer(null)
  }

  const open = Boolean(anchorEl)
  const addProduct = (product: IProduct) => {
    const productExists = selectedProducts.some((item) => item.id === product.id)
    if (productExists) {
      message.warning("Sản phẩm đã tồn tại trong danh sách")
      return
    }
    setSelectedProducts([...selectedProducts, product])
    setTotalSelectedProducts(totalSelectedProducts + 1)
  }

  const removeProduct = (index: number) => {
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts.splice(index, 1)
    setSelectedProducts(newSelectedProducts)
    setTotalSelectedProducts(totalSelectedProducts - 1)
  }

  const checkImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "https://picsum.photos/800/600"

    if (imageUrl.includes("example.com")) {
      return "https://picsum.photos/800/600"
    }

    return imageUrl
  }

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + delta, 1),
    }))
  }

  const getRandomColor = () => {
    const colorPairs = [
      { background: "#E6EFFF !important", color: "#3F6AD8 !important" }, // Xanh dương
      { background: "#FFF8E6 !important", color: "#FCAF17 !important" }, // Vàng/Cam
      { background: "#E6F9FF !important", color: "#33C4FF !important" }, // Xanh da trời
      { background: "#FFE6E6 !important", color: "#FF6B6B !important" }, // Hồng
      { background: "#E6FFFA !important", color: "#13DEB9 !important" }, // Xanh lá
      { background: "#F0E6FF !important", color: "#7E3CF9 !important" }, // Tím
    ]

    const randomIndex = Math.floor(Math.random() * colorPairs.length)
    return colorPairs[randomIndex]
  }

  const getCustomerColor = (customer: any) => {
    if (!customerColors.has(customer.id)) {
      customerColors.set(customer.id, getRandomColor())
    }
    return customerColors.get(customer.id)
  }

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer)
    setSelectedShopId(customer.id)
    setAnchorEl(null)
    setShowProducts(true)
  }

  const handleSelectUser = (user: any) => {
    setSelectedUser(user)
    setSelectedCustomer({
      ...selectedCustomer,
      email: user.email,
      phone: user.phone,
      address: user.address,
      userId: user.id,
    })
    message.success(`Khách ảo: ${user.fullName} đã được thêm thành công`)
  }

  const handleCreateFakeOrder = () => {
    setConfirmOpen(true)
  }

  const handleConfirmOrder = () => {
    if (!selectedUser) {
      message.warning("Vui lòng chọn người dùng hợp lệ")
      return
    }

    if (!selectedCustomer || selectedProducts.length === 0) {
      message.warning("Vui lòng chọn khách hàng và sản phẩm")
      return
    }

    if (!validUsers || validUsers.data.data.length === 0) {
      message.warning("Không tìm thấy người dùng hợp lệ cho sản phẩm đã chọn")
      return
    }

    const payload = {
      items: selectedProducts.map((product) => ({
        shopProductId: product.shopId,
        quantity: quantities[product.id] || 1,
      })),
      email: selectedUser.email,
      phone: selectedUser.phone,
      address: selectedUser.address || "Việt Nam",
      userId: selectedUser.id,
    }

    createFakeOrder(payload, {
      onSuccess: () => {
        message.success("Tạo đơn hàng ảo thành công")
        setSelectedProducts([])
        setSelectedCustomer(null)
        setSelectedUser(null)
        setTotalSelectedProducts(0)
        setConfirmOpen(false)
      },
      onError: (error) => {
        message.error(`Lỗi khi tạo đơn hàng: ${error.message}`)
      },
    })
  }

  const handleSearchShop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchShop(e.target.value)
    setShowShops(true)
    console.log(shopsData)
  }

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCountry(e.target.value)
    setSelectedState("")
    setSelectedCity("")
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setSelectedState(e.target.value)
    setSelectedCity("")
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    setSelectedCity(e.target.value)
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleDistrictChange = (e: SelectChangeEvent<string>) => {
    setSelectedDistrict(e.target.value)
    setSelectedPostalCode("")
  }

  const handlePostalCodeChange = (e: SelectChangeEvent<string>) => {
    setSelectedPostalCode(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleSaveAddress = async () => {
    if (!selectedUserId) {
      message.warning("Vui lòng chọn người dùng")
      return
    }

    try {
      await updateUserMutation.mutateAsync({
        id: selectedUserId,
        payload: {
          countryId: selectedCountry,
          stateId: selectedState,
          cityId: selectedCity,
          districtId: selectedDistrict,
          postalCodeId: selectedPostalCode,
          address: address,
        },
      })
      message.success("Đã cập nhật địa chỉ cho người dùng.")
      handleCloseDialog()
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật địa chỉ")
    }
  }

  const handleSelectShop = (shopId: string) => {
    setSelectedShopId(shopId)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const displayedShops = shopsData?.data?.data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) || []

  const uniqueProducts = productsData?.data?.data?.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.product.id === item.product.id
    ))
  ).slice(0, 5) || [];

  return (
    <Box component="section" className={styles.storehouse}>
      <Box className="px-4 py-4 mx-auto ">
        <Box className="flex flex-col gap-4 md:flex-row">
          <Box className="flex flex-col h-screen md:flex-1">
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
                  Các Shop hiện có ({shopsData?.data?.data.length || 0}). Vui lòng nhấn chọn một Shop để hiển thị sản phẩm.
                </Typography>
              </Box>
              <Paper elevation={1} sx={{ borderRadius: 1, border: "1px solid #E0E0E0" }}>
                <Box className="">
                  <Box className="w-full !p-4 flex justify-between gap-2 mb-3">
                    <FormControl variant="outlined">
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

                    {/* <FormControl fullWidth variant="outlined">
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
                    </FormControl> */}
                    <Box className="flex items-center gap-2">
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
                  </Box>
                  {isLoadingShops ? (
                    <Box className="flex items-center justify-center h-[200px]">
                      <Spin size="default" />
                    </Box>
                  ) : (
                    <>
                      {displayedShops.length === 0 ? (
                        <Box className="flex items-center justify-center">
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              searchShop ? "Không tìm thấy shop phù hợp." : "Chưa có shop nào. Vui lòng nhập tìm kiếm shop."
                            }
                          />
                        </Box>
                      ) :
                        <>
                          <List sx={{ padding: 0 }} className="!px-0">
                            {displayedShops.map((shop, index) => (
                              <div key={shop.id}>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                  <ListItem
                                    sx={{
                                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                      cursor: 'pointer',
                                      '&:hover': { backgroundColor: '#f5f5f5' },
                                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "inherit",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.dataset.customer = JSON.stringify(shop)
                                      handlePopoverOpen(e)
                                    }}
                                    onMouseLeave={handlePopoverClose}
                                    onClick={() => handleCustomerSelect(shop)}
                                  >
                                    <Radio
                                      checked={selectedShopId === shop.id}
                                      onChange={(e) => {
                                        e.stopPropagation()
                                        handleSelectShop(shop.id)
                                      }}
                                      sx={{ mr: 1 }}
                                      size="small"
                                    />
                                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
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
                                          ...getCustomerColor(shop),
                                        }}
                                      >
                                        {shop.shopName?.substring(0, 2).toUpperCase()}
                                      </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Stack direction="row" spacing={2}>
                                          <div style={{ width: '200px' }}>
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
                                          </div>
                                          <div style={{ width: '200px' }}>
                                            <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                              <IconMail className="flex-shrink-0 w-4 h-4 mr-1" /> {shop.email}
                                            </Box>
                                          </div>
                                          <div style={{ width: '150px' }}>
                                            <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                              <IconPhone className="flex-shrink-0 w-4 h-4 mr-1" /> {shop.phone}
                                            </Box>
                                          </div>
                                        </Stack>
                                      }
                                    />
                                  </ListItem>
                                </Collapse>
                              </div>
                            ))}
                          </List>
                          <TablePagination
                            component="div"
                            count={shopsData?.data?.data.length || 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[]}
                            labelRowsPerPage=""
                            labelDisplayedRows={({ from, to, count }) =>
                              `${from}–${to} của ${count}`
                            }
                            sx={{
                              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                              '& .MuiTablePagination-toolbar': {
                                paddingLeft: 2,
                                paddingRight: 2,
                              }
                            }}
                          />
                        </>
                      }

                    </>
                  )}
                </Box>
              </Paper>
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
                          ...getRandomColor(),
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
            {showProducts && (
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
                    <IconBrandProducthunt className="w-4 h-4" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#3F6AD8" }}>
                    Sản phẩm hiện có của {selectedCustomer?.shopName} ({(productsData?.data?.data as any)?.length})
                  </Typography>
                  <Box sx={{ ml: 'auto' }}>
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
                {viewMode === 'grid' ? (
                <Box className="grid grid-cols-1 gap-4 mb-10 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
                  {productsData?.data?.data?.length === 0 ? (
                    <Box className="flex items-center justify-center h-full col-span-3">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Shop chưa có sản phẩm."} />
                    </Box>
                  ) : (
                    productsData?.data?.data?.map((item) => {
                      const product = (item as any).product
                      return (
                        <Box key={item.id} className={styles.productCard}>
                          <Box className={`${styles.card} !rounded-[8px] overflow-hidden`}>
                            <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                              <Box className={styles.imageContainer}>
                                <Box className="h-6 bg-[#FEF5E5] text-[#FCAF17] font-semibold rounded-[4px] px-2 text-xs flex items-center justify-center absolute z-50 border-none -top-2 -right-2">
                                  Trong kho: {product.stock}
                                </Box>
                                <Image
                                  src={checkImageUrl(product.imageUrl || "")}
                                  alt={product.name}
                                  className={`${styles.productImage}`}
                                  width={140}
                                  height={140}
                                  draggable={false}
                                />
                              </Box>
                              <Box className={styles.productName}>
                                Tên sản phẩm: {product.name.slice(0, 50)}
                                {product.name.length > 50 && "..."}
                              </Box>
                              <Box className={styles.productDescription}>
                                <strong>Mô tả: </strong>
                                {product.description.slice(0, 100)}
                                {product.description.length > 100 && "..."}
                              </Box>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <span>Giá bán:</span>
                                  <span className="!text-green-500">${Number(product.salePrice).toFixed(2)}</span>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <span>Giá nhập:</span>
                                  <span className="!text-amber-500">${Number(product.price).toFixed(2)}</span>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <span>Lợi nhuận:</span>
                                  <span className="!text-red-500 font-bold">${(item as any).profit}</span>
                                </Box>
                              </Box>
                              <Box
                                className={styles.addButton}
                                onClick={() => addProduct({ ...product, shopId: item.id })}
                              >
                                <Box className={styles.overlay}></Box>
                                <IconPlus className={styles.plusIcon} />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                  )}
                  {(productsData?.data?.meta as any)?.itemCount > (productsData?.data?.meta as any)?.take && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}>
                    <Pagination
                      count={Math.ceil(
                        (productsData?.data?.meta as any)?.itemCount / (productsData?.data?.meta as any)?.take,
                      )}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      color="primary"
                    />
                  </Box>
                )}
                </Box>
                ) : (
                  <Paper elevation={1} sx={{ borderRadius: 1, border: "1px solid #E0E0E0" }}>
                    <List sx={{ padding: 0 }} className="!px-0">
                      {uniqueProducts.map((item, index) => {
                        const product = (item as any).product
                        const isSelected = selectedProducts.some(p => p.id === product.id)
                        return (
                          <div key={item.id}>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                              <ListItem
                                sx={{
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: '#f5f5f5' },
                                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "inherit",
                                }}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => {
                                    if (isSelected) {
                                      const index = selectedProducts.findIndex(p => p.id === product.id)
                                      removeProduct(index)
                                    } else {
                                      addProduct({ ...product, shopId: item.id })
                                    }
                                  }}
                                  sx={{ mr: 1 }}
                                  size="small"
                                />
                                <ListItemText
                                  primary={
                                    <Stack direction="row" spacing={2}>
                                      <div style={{ width: '200px' }}>
                                        <Typography
                                          fontWeight={500}
                                          sx={{ display: "flex", alignItems: "center", color: "#FCAF17", fontSize: "16px" }}
                                        >
                                          {product.name.slice(0, 50)}
                                          {product.name.length > 50 && "..."}
                                        </Typography>
                                      </div>
                                      <div style={{ width: '200px' }}>
                                        <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                          Giá bán: ${Number(product.salePrice).toFixed(2)}
                                        </Box>
                                      </div>
                                      <div style={{ width: '150px' }}>
                                        <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                          Giá nhập: ${Number(product.price).toFixed(2)}
                                        </Box>
                                      </div>
                                      <div style={{ width: '150px' }}>
                                        <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                          Lợi nhuận: ${(Number(product.salePrice) - Number(product.price)).toFixed(2)}
                                        </Box>
                                      </div>
                                    </Stack>
                                  }
                                  secondary={
                                    <>
                                      {product.description.slice(0, 100)}
                                      {product.description.length > 100 && "..."}
                                    </>
                                  }
                                />
                              </ListItem>
                            </Collapse>
                          </div>
                        )
                      })}
                    </List>
                    <TablePagination
                      component="div"
                      count={uniqueProducts.length}
                      page={currentPage - 1}
                      onPageChange={(e, page) => setCurrentPage(page + 1)}
                      rowsPerPage={5}
                      onRowsPerPageChange={(e) => {
                        // Handle rows per page change if needed
                      }}
                    />
                  </Paper>
                )}
                
              </Box>
            )}
          </Box>

          <Box className="md:w-[400px]">
            {validUsers && validUsers.data.data.length > 0 && (
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
            )}
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

            {/* Valid users render here */}
            {validUsers && validUsers.data.data.length > 0 && (
              <Box sx={{ maxHeight: "40%", overflow: "auto", mb: 2, border: "1px solid #e0e0e0", borderRadius: "4px" }}>
                <List>
                  {validUsers.data.data.map((user, index) => (
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
                          <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            variant="body2"
                            color="text.secondary"
                          >
                            <IconMail className="w-3 h-3 mr-1" /> {user.email}
                          </Typography>
                        }
                        sx={{ my: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {totalSelectedProducts > 0 && (
              <Box className="my-3 text-center">
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#3F6AD8" }}>
                  Tổng sản phẩm đã chọn ({totalSelectedProducts})
                </Typography>
              </Box>
            )}

            <Box sx={{ padding: 0 }}>
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
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeProduct(index)
                                }}
                                color="error"
                              >
                                <IconTrash className="w-3 h-3" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuantityChange(product.id, -1)
                                }}
                                sx={{ border: "1px solid #e0e0e0" }}
                              >
                                <IconMinus className="w-3 h-3" />
                              </IconButton>
                              <Box sx={{ minWidth: "30px", textAlign: "center" }}>{quantities[product.id] || 1}</Box>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuantityChange(product.id, 1)
                                }}
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
                    <Box sx={{ width: "100%", pt: 2, borderTop: "1px solid #e0e0e0" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                          Tổng:
                        </Typography>
                        <span className="font-normal text-gray-400">
                          $
                          {selectedProducts
                            .reduce((sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1), 0)
                            .toFixed(2)}
                        </span>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                          Thuế (8%):
                        </Typography>
                        <span className="font-normal text-gray-400">
                          $
                          {(
                            selectedProducts.reduce(
                              (sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1),
                              0,
                            ) * 0.08
                          ).toFixed(2)}
                        </span>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography fontSize="14px" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                          Đang chuyển hàng:
                        </Typography>
                        <span className="font-normal text-gray-400">$5.00</span>
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
                          ${" "}
                          {(
                            selectedProducts.reduce(
                              (sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1),
                              0,
                            ) *
                            1.08 +
                            5
                          ).toFixed(2)}
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box className="flex items-center justify-center h-[20%] col-span-3">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Chưa có sản phẩm nào được chọn."} />
                  </Box>
                )}
              </Box>
            </Box>
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
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "60vw",
            maxWidth: "none",
          },
        }}
      >
        <DialogTitle fontSize={18}>Thêm địa chỉ mới</DialogTitle>
        <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2,  mt: 2 }}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chọn người dùng</InputLabel>
                    <Select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      label="Chọn người dùng"
                      size="small"
                    >
                      {shopsData?.data?.data.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Quốc gia</InputLabel>
                    <Select value={selectedCountry} onChange={handleCountryChange} label="Quốc gia">
                      {Object.keys(geographicData).map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tỉnh/Thành phố</InputLabel>
                    <Select
                      value={selectedState}
                      onChange={handleStateChange}
                      label="Tỉnh/Thành phố"
                      disabled={!selectedCountry}
                    >
                      {selectedCountry &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).provinces.map(
                          (province: any) => (
                            <MenuItem key={province.code} value={province.code}>
                              {province.name}
                            </MenuItem>
                          ),
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Thành phố/Quận</InputLabel>
                    <Select
                      value={selectedCity}
                      onChange={handleCityChange}
                      label="Thành phố/Quận"
                      disabled={!selectedState}
                    >
                      {selectedState &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).city[
                          selectedState
                        ]?.map((city: any) => (
                          <MenuItem key={city.code} value={city.code}>
                            {city.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Quận/Huyện</InputLabel>
                    <Select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      label="Quận/Huyện"
                      disabled={!selectedCity}
                    >
                      {selectedCity &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).ward[selectedCity]?.map(
                          (ward: any) => (
                            <MenuItem key={ward.code} value={ward.code}>
                              {ward.name}
                            </MenuItem>
                          ),
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Mã bưu điện</InputLabel>
                    <Select
                      value={selectedPostalCode}
                      onChange={handlePostalCodeChange}
                      label="Mã bưu điện"
                      disabled={!selectedDistrict}
                    >
                      {selectedDistrict &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).city[
                          selectedState
                        ]?.find((city: any) => city.code === selectedCity)?.postalCodeId && (
                          <MenuItem value={selectedPostalCode}>{selectedPostalCode}</MenuItem>
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Địa chỉ chi tiết"
                    value={address}
                    onChange={handleAddressChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mx-4 mb-4">
          <Button 
          className="!normal-case" 
          variant="outlined"
          onClick={handleCloseDialog}>Huỷ bỏ</Button>
          <Button className="!normal-case" onClick={handleSaveAddress} variant="contained">
            Lưu địa chỉ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle fontSize={18}>Xác nhận đơn hàng</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Chi tiết đơn hàng
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>
                <strong>Khách hàng:</strong> {selectedUser?.fullName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser?.email}
              </Typography>
              <Typography>
                <strong>Số điện thoại:</strong> {selectedUser?.phone}
              </Typography>
              <Typography>
                <strong>Địa chỉ:</strong> {selectedUser?.address}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sản phẩm đã chọn
              </Typography>
              <List>
                {selectedProducts.map((product) => (
                  <ListItem key={product.id} sx={{ py: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <Typography>{product.name}</Typography>
                      <Typography>
                        {quantities[product.id] || 1} x ${Number(product.salePrice).toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #e0e0e0" }}>
              <Typography variant="h6">
                Tổng cộng: $
                {(
                  selectedProducts.reduce((sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1), 0) * 1.08 +
                  5
                ).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
          className="!normal-case" 
          variant="outlined"
          onClick={() => setConfirmOpen(false)}>Hủy bỏ</Button>
          <Button className="!normal-case" onClick={handleConfirmOrder} variant="contained">
            Xác nhận đặt hàng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default AdminPosPage

