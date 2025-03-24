import { IProduct } from "./product"

export interface IShopProduct {
  id: string
  userId: string
  productId: string
  quantity: number
  price: number
  profit: number
  createdAt: string
  updatedAt: string
  product: IProduct
}

export interface IShopProductsResponse {
  status: boolean
  message: string
  data: {
    data: Array<{
      id: string
      createdAt: string
      updatedAt: string
      deletedAt: string | null
      email: string
      username: string
      fullName: string
      phone: string
      invitationCode: string | null
      referralCode: string
      role: string
      isActive: boolean
      balance: string
      fedexBalance: string
      bankName: string | null
      bankAccountNumber: string | null
      bankAccountName: string | null
      bankBranch: string | null
      bankNumber: string | null
      bankCode: string | null
      address: string | null
      city: string | null
      district: string | null
      ward: string | null
      stars: number
      reputationPoints: number
      shopName: string
      shopAddress: string
      sellerPackageExpiry: string | null
      spreadPackageExpiry: string | null
      sellerPackage: {
        id: string
        createdAt: string
        updatedAt: string
        deletedAt: string | null
        name: string
        price: number
        description: string
        image: string
        isActive: boolean
        duration: number
        percentProfit: number
        maxProducts: number
      } | null
      spreadPackage: any | null
    }>
    meta: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
  errors: any | null
  timestamp: string
}

export interface IShopsListResponse {
  status: boolean
  message: string
  statusCode?: number
  data: {
      data: IShopProduct[]
      meta: {
          page: number
          take: number
          itemCount: number
          pageCount: number
          hasPreviousPage: boolean
          hasNextPage: boolean
      }
  }
  errors?: any | null
  timestamp?: string
}

export interface IAllShopsResponse {
    status: boolean
    message: string
    statusCode?: number
    data: {
        data: IShopProduct[]
        meta: {
            page: number
            take: number
            itemCount: number
            pageCount: number
            hasPreviousPage: boolean
            hasNextPage: boolean
        }
    }
    errors?: any | null
    timestamp?: string
}
