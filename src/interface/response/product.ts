export interface ICategory {
    id: string
    name: string
    description: string
    parentId: string | null
    createdAt: string
    updatedAt: string
    deletedAt: null | string
}

export interface IProduct {
    id: string
    name: string
    description: string
    imageUrls: string[]
    salePrice: string
    price: string
    stock: number
    isHot: boolean
    category: ICategory
    createdAt: string
    updatedAt: string
    deletedAt: null | string
}

export interface IPaginationMeta {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export interface IProductList {
    data: IProduct[]
    meta: IPaginationMeta
}

export interface IApiResponse<T> {
    status: boolean
    message: string
    data: T
    errors: null | any
    timestamp: string
}

export interface IProductListResponse extends IApiResponse<IProductList> {}

export interface IProductResponse extends IApiResponse<IProduct> {}