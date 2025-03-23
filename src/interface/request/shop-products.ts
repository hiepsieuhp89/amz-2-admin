export interface IShopProductItem {
    productId: string
    quantity: number
    price?: number
}

export interface IAddShopProductsRequest {
    productIds: string[]
}

export interface IRemoveShopProductsRequest {
    productIds: string[]
}

export interface IProductSearchParams {
    keyword?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
}
