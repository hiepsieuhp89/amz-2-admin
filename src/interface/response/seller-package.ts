export interface ISellerPackage {
    id: string
    name: string
    description?: string
    price: number
    duration: number
    productLimit: number
    features: string[]
    isActive: boolean
    createdAt: string
    updatedAt: string
    image: string
    maxProducts: number
    percentProfit: number
}

export interface ISellerPackageListResponse {
    data: ISellerPackage[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ISellerPackageResponse {
    data: ISellerPackage
}

