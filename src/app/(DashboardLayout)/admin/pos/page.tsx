"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Badge, message } from "antd"
import { useGetAllProducts } from "@/hooks/product"
import { IProduct } from "@/interface/response/product"
import Image from "next/image"
import { useAddShopProducts } from "@/hooks/shop-products"
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
    MenuItem
} from "@mui/material"
import {
    IconCheck,
    IconCopyCheck,
    IconPlus,
    IconSearch,
    IconTrash,
    IconMinus
} from "@tabler/icons-react"

const AdminPosPage = () => {
    const { data: productsData, isLoading, refetch } = useGetAllProducts({
        page: 1,
    })
    const { mutate: addShopProducts, isPending: isAddingProducts } = useAddShopProducts()
    console.log(productsData)
    const [products, setProducts] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(productsData?.data?.data || [])
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
    const [keyword, setKeyword] = useState("")
    const [minPrice, setMinPrice] = useState<number | undefined>()
    const [maxPrice, setMaxPrice] = useState<number | undefined>()
    const [quantity, setQuantity] = useState<number | undefined>()
    const [totalSelectedProducts, setTotalSelectedProducts] = useState(0)
    const [quantities, setQuantities] = useState<{[key: string]: number}>({});

    const filterProducts = () => {
        if (keyword || minPrice !== undefined || maxPrice !== undefined) {
            let filtered = [...productsData?.data?.data || []]

            if (keyword) {
                filtered = filtered.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()))
            }

            if (minPrice !== undefined) {
                filtered = filtered.filter((product) => Number(product.salePrice) >= minPrice)
            }

            if (maxPrice !== undefined) {
                filtered = filtered.filter((product) => Number(product.salePrice) <= maxPrice)
            }

            setFilteredProducts(filtered)
        } else {
            setFilteredProducts(productsData?.data?.data || [])
        }
    }

    useEffect(() => {
        if ((productsData?.data?.data as any)?.length > 0) {
            filterProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, minPrice, maxPrice, productsData?.data?.data])

    const addProduct = (product: IProduct) => {
        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách đã chọn chưa
        const productExists = selectedProducts.some(item => item.id === product.id);

        if (productExists) {
            message.warning("Sản phẩm đã tồn tại trong danh sách");
            return;
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

    const selectRandomProducts = () => {
        if (!quantity || quantity <= 0 || quantity > products.length) return

        const shuffled = [...products].sort(() => 0.5 - Math.random())
        const randomProducts = shuffled.slice(0, quantity)

        setSelectedProducts(randomProducts)
        setTotalSelectedProducts(randomProducts.length)
    }

    const addAllSelectedProducts = () => {
        const productIds = selectedProducts.map(product => product.id)

        addShopProducts(
            { productIds: productIds },
            {
                onSuccess: () => {
                    message.success("Thêm sản phẩm vào cửa hàng thành công")
                    setSelectedProducts([])
                    setTotalSelectedProducts(0)
                },
                onError: (error) => {
                    message.error(`Lỗi khi thêm sản phẩm: ${error.message}`)
                }
            }
        )
    }

    const checkImageUrl = (imageUrl: string): string => {
        if (!imageUrl) return "https://picsum.photos/800/600";

        if (imageUrl.includes("example.com")) {
            return "https://picsum.photos/800/600";
        }

        return imageUrl;
    };

    const handleQuantityChange = (productId: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 1) + delta, 1)
        }));
    };

    return (
        <Box component="section" className={styles.storehouse}>
            <Box className="container px-4 py-4 mx-auto">
                <Box className="flex flex-col gap-4 md:flex-row">
                    <Box className="flex flex-col h-full md:flex-1">
                        <Box className="grid grid-cols-2 gap-3 mb-3 md:grid-cols-4">
                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email">Email khách hàng</InputLabel>
                                <OutlinedInput
                                    size="small"
                                    id="outlined-adornment-email"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    startAdornment={<InputAdornment position="start"><IconSearch className="w-4 h-4" /></InputAdornment>}
                                    label="Email khách hàng"
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-product">Tìm sản phẩm</InputLabel>
                                <OutlinedInput
                                    size="small"
                                    id="outlined-adornment-product"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    startAdornment={<InputAdornment position="start"><IconSearch className="w-4 h-4" /></InputAdornment>}
                                    label="Tìm sản phẩm"
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <TextField
                                    size="small"
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                                    label="Giá bắt đầu"
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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

                        <Box className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[400px] overflow-y-auto">
                            {isLoading ? (
                                <Box className="flex items-center justify-center h-full col-span-2">
                                    <CircularProgress size={24} />
                                </Box>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Box key={product.id} className={styles.productCard}>
                                        <Box className={`${styles.card} !rounded-[8px] overflow-hidden `}>
                                            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <Box className={styles.imageContainer}>
                                                    <Badge
                                                        count={`Trong kho: ${product.stock}`}
                                                        color="green"
                                                        offset={[0, 0]}
                                                        className="absolute z-50 -top-2 -right-2"
                                                    >
                                                    </Badge>
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
                                                    Tên sản phẩm: {product.name}
                                                </Box>
                                                <Box className={styles.productDescription}>
                                                    <strong>Mô tả: </strong>
                                                    {product.description}
                                                </Box>
                                                <Box className={styles.priceInfo}>
                                                    <span>Giá bán:</span>
                                                    <span className="!text-green-500">{Number(product.salePrice).toFixed(2)}</span>
                                                </Box>
                                                <Box className={styles.priceInfo}>
                                                    <span>Giá nhập:</span>
                                                    <span className="!text-amber-500">{Number(product.price).toFixed(2)}</span>
                                                </Box>
                                                <Box className={styles.priceInfo}>
                                                    <span>Lợi nhuận:</span>
                                                    <span className="!text-red-500 font-bold">${(Number(product.salePrice) - Number(product.price)).toFixed(2)}</span>
                                                </Box>
                                                <Box
                                                    className={styles.addButton}
                                                    onClick={() => addProduct(product)}
                                                >
                                                    <Box className={styles.overlay}></Box>
                                                    <IconPlus className={styles.plusIcon} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box>Không tìm thấy sản phẩm</Box>
                            )}
                        </Box>

                        {filteredProducts.length > 12 && (
                            <div className="mt-4 text-center">
                                <Button
                                    variant="outlined"
                                >
                                    Tải thêm
                                </Button>
                            </div>
                        )}
                    </Box>

                    <Box className="md:w-[400px]">
                        <Box className="flex items-center mb-3">
                            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-product">Tìm khách ảo</InputLabel>
                                <OutlinedInput
                                    size="small"
                                    id="outlined-adornment-product"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    startAdornment={<InputAdornment position="start"><IconSearch className="w-4 h-4" /></InputAdornment>}
                                    label="Tìm khách ảo"
                                />
                            </FormControl>
                            <IconButton
                                sx={{
                                    height: "36px",
                                    width: "36px",
                                    backgroundColor: "gray",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "gray",
                                    },
                                }}
                                size="small"
                                className="flex-shrink-0 !rounded-[4px]"
                            >
                                <IconCopyCheck />
                            </IconButton>
                        </Box>

                        {totalSelectedProducts > 0 && (
                            <Box className="my-3 text-center">
                                <h5>
                                    Tổng sản phẩm đã chọn: <strong>{totalSelectedProducts}</strong>
                                </h5>
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
                                                    secondaryAction={
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => removeProduct(index)}
                                                            color="error"
                                                        >
                                                            <IconTrash className="w-4 h-4" />
                                                        </IconButton>
                                                    }
                                                    sx={{
                                                        borderBottom: '1px solid #e0e0e0',
                                                        '&:last-child': {
                                                            borderBottom: 'none'
                                                        },
                                                        padding: '0px',
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                                sx={{ border: '1px solid #e0e0e0' }}
                                                            >
                                                                <IconMinus className="w-3 h-3" />
                                                            </IconButton>
                                                            <Box sx={{ minWidth: '30px', textAlign: 'center' }}>
                                                                {quantities[product.id] || 1}
                                                            </Box>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                                sx={{ border: '1px solid #e0e0e0' }}
                                                            >
                                                                <IconPlus className="w-3 h-3" />
                                                            </IconButton>
                                                        </Box>
                                                        <ListItemAvatar>
                                                            <Image
                                                                src={checkImageUrl(product.imageUrl || "")}
                                                                alt={product.name}
                                                                className="w-16 h-16 object-cover rounded-[4px]"
                                                                width={64}
                                                                height={64}
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
                                                                    <span>Giá bán: ${Number(product.salePrice).toFixed(2)}</span>
                                                                    <span>Giá nhập: ${Number(product.price).toFixed(2)}</span>
                                                                    <span>Lợi nhuận: ${(Number(product.salePrice) - Number(product.price)).toFixed(2)}</span>
                                                                </Box>
                                                            </>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Box sx={{ p: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <span>Tổng:</span>
                                                <span>${selectedProducts.reduce((sum, p) => sum + (Number(p.salePrice) * (quantities[p.id] || 1)), 0).toFixed(2)}</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <span>Thuế (8%):</span>
                                                <span>${(selectedProducts.reduce((sum, p) => sum + (Number(p.salePrice) * (quantities[p.id] || 1)), 0) * 0.08).toFixed(2)}</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <span>Đang chuyển hàng:</span>
                                                <span>$5.00</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <span>Giảm giá:</span>
                                                <span>$0.00</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                                <strong>Toàn bộ:</strong>
                                                <strong>
                                                    ${(
                                                        selectedProducts.reduce((sum, p) => sum + (Number(p.salePrice) * (quantities[p.id] || 1)), 0) * 1.08 + 5
                                                    ).toFixed(2)}
                                                </strong>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
                                    <Box>Chưa có sản phẩm nào được chọn</Box>
                                )}
                            </Box>
                        </Card>
                        <Box className="grid grid-cols-2 gap-2 mt-4">
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái đơn hàng</InputLabel>
                                <Select
                                    size="small"
                                    label="Trạng thái đơn hàng"
                                    defaultValue="pending"
                                >
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
                                onClick={addAllSelectedProducts}
                                disabled={selectedProducts.length === 0}
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

