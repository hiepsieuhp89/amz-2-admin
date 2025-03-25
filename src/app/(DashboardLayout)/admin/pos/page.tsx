"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, message, Empty, Spin } from "antd"
import { useGetAllShopProducts } from "@/hooks/shop-products"
import type { IProduct } from "@/interface/response/product"
import Image from "next/image"
import styles from "./storehouse.module.scss"
import {
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
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
    IconClipboardList,
    IconBrandProducthunt,
    IconAlertCircle,
} from "@tabler/icons-react"
import { useGetAllUsers } from "@/hooks/user"
import { useCreateFakeOrder, useGetValidUsers } from "@/hooks/fake-order"

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
    const {
        data: productsData,
        isLoading,
    } = useGetAllShopProducts({
        shopId: selectedShopId,
        page: 1,
    })
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [customerColors] = useState(new Map())
    const { mutate: createFakeOrder } = useCreateFakeOrder()
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>((productsData as any)?.data?.data || [])
    const [showShops, setShowShops] = useState(false)
    const [showProducts, setShowProducts] = useState(false)
    const [searchUser, setSearchUser] = useState("");
    const { data: validUsers } = useGetValidUsers({
        shopProductIds: selectedProducts.map(product => product.id),
        search: searchUser
    });
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [hoveredCustomer, setHoveredCustomer] = useState<any>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        const customer = event.currentTarget.dataset.customer;
        if (customer) {
            setAnchorEl(event.currentTarget);
            setHoveredCustomer(JSON.parse(customer));
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredCustomer(null);
    };

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
        setSelectedUser(user);
        setSelectedCustomer({
            ...selectedCustomer,
            email: user.email,
            phone: user.phone,
            address: user.address,
            userId: user.id
        });
        message.success(`Khách ảo: ${user.fullName} đã được thêm thành công`);
    };

    const handleCreateFakeOrder = () => {
        if (!selectedUser) {
            message.warning('Vui lòng chọn người dùng hợp lệ');
            return;
        }

        if (!selectedCustomer || selectedProducts.length === 0) {
            message.warning('Vui lòng chọn khách hàng và sản phẩm');
            return;
        }

        if (!validUsers || validUsers.data.data.length === 0) {
            message.warning('Không tìm thấy người dùng hợp lệ cho sản phẩm đã chọn');
            return;
        }

        const payload = {
            items: selectedProducts.map(product => ({
                shopProductId: product.shopId,
                quantity: quantities[product.id] || 1
            })),
            email: selectedUser.email,
            phone: selectedUser.phone,
            address: selectedUser.address || "Việt Nam",
            userId: selectedUser.id
        };

        createFakeOrder(payload, {
            onSuccess: () => {
                message.success('Tạo đơn hàng ảo thành công');
                setSelectedProducts([]);
                setSelectedCustomer(null);
                setSelectedUser(null);
                setTotalSelectedProducts(0);
            },
            onError: (error) => {
                message.error(`Lỗi khi tạo đơn hàng: ${error.message}`);
            }
        });
    };

    const handleSearchShop = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchShop(e.target.value)
        setShowShops(true)
    }

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(e.target.value);
    };

    return (
        <Box component="section" className={styles.storehouse}>
            <Box className="container px-4 py-4 mx-auto">
                <Box className="flex flex-col gap-4 md:flex-row">
                    <Box className="flex flex-col h-screen md:flex-1">
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

                        {/* Loading & Data Section */}
                        {(isLoadingShops && searchShop) ? (
                            <Box className="flex items-center justify-center h-[20%] col-span-3">
                                <Spin size="default" />
                            </Box>
                        ) : (
                            shopsData?.data?.data && shopsData.data.data.length > 0 ? (
                                <Box sx={{ mb: 4 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "#ECF2FF", borderRadius: "4px", color: "#5D87FF" }}>
                                            <IconBuildingStore className="w-4 h-4" />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#3F6AD8' }}>
                                            Các Shop hiện có ({shopsData.data.data.length})
                                        </Typography>
                                    </Box>
                                    <Box sx={{ maxHeight: "60vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "4px" }}>
                                        <List>
                                            {shopsData.data.data.map((shop, index) => (
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
                                                        e.currentTarget.dataset.customer = JSON.stringify(shop);
                                                        handlePopoverOpen(e);
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
                                                            <Typography
                                                                sx={{ display: "flex", alignItems: "center" }}
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
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
                                                            fontSize: "14px", "&:hover": { color: "#3F6AD8" },
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
                                                            fontSize: "14px", "&:hover": { color: "#3F6AD8" },
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
                            ) : (
                                <Box className="flex items-center justify-center h-[10%]">
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={searchShop ? "Không tìm thấy shop phù hợp." : "Chưa có shop nào. Vui lòng nhập tìm kiếm shop."}
                                    />
                                </Box>
                            )
                        )}

                        {showProducts && (
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "#ECF2FF", borderRadius: "4px", color: "#5D87FF" }}>
                                        <IconBrandProducthunt className="w-4 h-4" />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#3F6AD8' }}>
                                        Sản phẩm hiện có ({(productsData?.data?.data as any)?.length})
                                    </Typography>
                                </Box>
                                <Box className="grid grid-cols-2 gap-4 mb-10 overflow-y-auto md:grid-cols-3">
                                    {productsData?.data?.data?.map((item) => {
                                        const product = (item as any).product;
                                        return (
                                            <Box
                                                key={product.id} className={styles.productCard}>
                                                <Box className={`${styles.card} !rounded-[8px] overflow-hidden `}>
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
                                                        <Box className={styles.productName}>Tên sản phẩm: {product.name}</Box>
                                                        <Box className={styles.productDescription}>
                                                            <strong>Mô tả: </strong>
                                                            {product.description}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                <span>Giá bán:</span>
                                                                <span className="!text-green-500">${Number(product.salePrice).toFixed(2)}</span>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                <span>Giá nhập:</span>
                                                                <span className="!text-amber-500">${Number(product.price).toFixed(2)}</span>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                <span>Lợi nhuận:</span>
                                                                <span className="!text-red-500 font-bold">
                                                                    ${(item as any)?.profit}
                                                                </span>
                                                            </Box>
                                                        </Box>
                                                        <Box className={styles.addButton} onClick={() => addProduct({ ...product, shopId: item.id })}>
                                                            <Box className={styles.overlay}></Box>
                                                            <IconPlus className={styles.plusIcon} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Box>
                        )}

                        {filteredProducts.length > 12 && (
                            <div className="mt-4 text-center">
                                <Button variant="outlined">Tải thêm</Button>
                            </div>
                        )}
                    </Box>

                    <Box className="md:w-[400px]">
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
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "#FDEDE8", borderRadius: "4px", color: "#FB9F87" }}>
                                <IconAlertCircle className="w-4 h-4" />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#FB9F87' }}>
                                Vui lòng chọn khách ảo trước khi đặt hàng !
                            </Typography>
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
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#3F6AD8' }}>
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
                                                        padding: "8px 0px",
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                                        <ListItemAvatar>
                                                            <Image
                                                                src={checkImageUrl(product.imageUrl || "")}
                                                                alt={product.name}
                                                                className="w-24 h-24 object-cover rounded-[4px] border"
                                                                width={200}
                                                                height={200}
                                                                draggable={false}
                                                            />
                                                        </ListItemAvatar>
                                                    </Box>
                                                    <ListItemText
                                                        className="px-4"
                                                        primary={product.name}
                                                        secondary={
                                                            <>
                                                                <Box>{product.description}</Box>
                                                                <Box>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <span>Giá bán:</span>
                                                                            <span className="!text-green-500">${Number(product.salePrice).toFixed(2)}</span>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <span>Giá nhập:</span>
                                                                            <span className="!text-amber-500">${Number(product.price).toFixed(2)}</span>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <span>Lợi nhuận:</span>
                                                                            <span className="!text-red-500 font-bold">
                                                                                ${(Number(product.salePrice) - Number(product.price)).toFixed(2)}
                                                                            </span>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </>
                                                        }
                                                    />
                                                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                        <IconButton
                                                            size="small"
                                                            sx={{ border: "2px solid #FDEDE8", bgcolor: "#FDEDE8", mb: 1 }}
                                                            onClick={() => removeProduct(index)} color="error">
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
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Box sx={{ p: 2 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                <Typography
                                                    fontSize="14px"
                                                    sx={{ fontWeight: 700, color: '#2c3e50' }}>Tổng:</Typography>
                                                <span className="font-normal text-gray-400">
                                                    $
                                                    {selectedProducts
                                                        .reduce((sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1), 0)
                                                        .toFixed(2)}
                                                </span>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                <Typography
                                                    fontSize="14px"
                                                    sx={{ fontWeight: 700, color: '#2c3e50' }}>Thuế (8%):</Typography>
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
                                                <Typography
                                                    fontSize="14px"
                                                    sx={{ fontWeight: 700, color: '#2c3e50' }}>Đang chuyển hàng:</Typography>
                                                <span className="font-normal text-gray-400">$5.00</span>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                <Typography
                                                    fontSize="14px"
                                                    sx={{ fontWeight: 700, color: '#2c3e50' }}>Giảm giá:</Typography>
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
                                                <Typography
                                                    fontSize="14px"
                                                    sx={{ fontWeight: 700, color: '#2c3e50' }}>Toàn bộ:</Typography>

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
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description={"Chưa có sản phẩm nào được chọn."}
                                        />
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
                </Box>
            </Box>
        </Box>
    )
}
export default AdminPosPage
