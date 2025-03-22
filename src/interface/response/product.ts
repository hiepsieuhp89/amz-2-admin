export interface IProductImage {
    id: string
    url: string
    isMain: boolean
    sortOrder: number
}

export interface IProductVariantResponse {
    id: string
    sku: string
    price: number
    compareAtPrice?: number
    costPrice?: number
    quantity: number
    attributes: Record<string, string>
    isDefault: boolean
}

export interface IProduct {
    id: string
    name: string
    description: string
    shortDescription?: string
    slug: string
    sku: string
    barcode?: string
    price: number
    compareAtPrice?: number
    costPrice?: number
    quantity: number
    categoryId?: string
    category?: {
        id: string
        name: string
    }
    brandId?: string
    brand?: {
        id: string
        name: string
    }
    tags: string[]
    attributes: Record<string, string | string[]>
    specifications: Record<string, string>
    isActive: boolean
    isFeatured: boolean
    isDigital: boolean
    weight?: number
    dimensions?: {
        length: number
        width: number
        height: number
    }
    variants: IProductVariantResponse[]
    images: IProductImage[]
    metaTitle?: string
    metaDescription?: string
    metaKeywords: string[]
    sellerId?: string
    seller?: {
        id: string
        name: string
    }
    rating: number
    reviewCount: number
    createdAt: string
    updatedAt: string
}

export interface IProductListResponse {
    data: IProduct[]
    total: number
    page: number
    limit: number
}

export interface IProductResponse {
    data: IProduct
}

