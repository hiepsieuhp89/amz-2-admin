"use client"

import type React from "react"

import { Box, Typography, Pagination } from "@mui/material"
import { Empty } from "antd"
import Image from "next/image"
import { IconBrandProducthunt, IconPlus } from "@tabler/icons-react"
import styles from "./storehouse.module.scss"

interface ProductSectionProps {
  productsData: any
  selectedCustomer: any
  addProduct: (product: any) => boolean
  currentPage: number
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const ProductSection = ({
  productsData,
  selectedCustomer,
  addProduct,
  currentPage,
  handlePageChange,
}: ProductSectionProps) => {
  const checkImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "https://picsum.photos/800/600"
    if (imageUrl.includes("example.com")) {
      return "https://picsum.photos/800/600"
    }
    return imageUrl
  }

  return (
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
      </Box>
      <Box className="grid grid-cols-1 gap-4 mb-10 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {productsData?.data?.data?.length === 0 ? (
          <Box className="flex items-center justify-center h-full col-span-3">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Shop chưa có sản phẩm."} />
          </Box>
        ) : (
          productsData?.data?.data?.map((item: any) => {
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
                    <Box className={styles.addButton} onClick={() => addProduct({ ...product, shopId: item.id })}>
                      <Box className={styles.overlay}></Box>
                      <IconPlus className={styles.plusIcon} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })
        )}
      </Box>
      {(productsData?.data?.meta as any)?.itemCount > (productsData?.data?.meta as any)?.take && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}>
          <Pagination
            count={Math.ceil((productsData?.data?.meta as any)?.itemCount / (productsData?.data?.meta as any)?.take)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </Box>
  )
}

export default ProductSection

