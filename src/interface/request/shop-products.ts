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

export interface IShopSearchParams {
    keyword?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
}

export interface IGetAllShopsRequest {
    order?: string
    page?: number
    take?: number
    search?: string
    status?: string
    shopId?: string
    name?: string
    code?: string
    minPrice?: number
    maxPrice?: number
}

export interface IGetShopProductsRequest {
    order?: string
    page?: number
    take?: number
    search?: string
    status?: string
    shopId: string
    name?: string
    code?: string
    minPrice?: number
    maxPrice?: number
}