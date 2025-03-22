export interface ISellerPackage {
    id: string
    name: string
    description?: string
    price: number
    duration: number
    image: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    deletedAt: null | string
    percentProfit: number
    maxProducts: number
}

export interface IApiResponse<T> {
    status: boolean
    message: string
    data: T
    errors: null | any
    timestamp: string
}

export interface ISellerPackageResponse extends IApiResponse<ISellerPackage> {}

export interface ISellerPackageListResponse extends IApiResponse<ISellerPackage[]> {}