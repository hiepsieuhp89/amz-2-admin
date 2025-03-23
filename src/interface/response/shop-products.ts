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
  message: string
  statusCode: number
  data: {
    success: boolean
    shopProducts?: IShopProduct[]
  }
}


export interface IProductsListResponse {
  status: boolean
  message: string
  statusCode?: number
  data: {
      data: IProduct[]
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
