export interface IFakeOrderItem {
  shopProductId: string
  quantity: number
}

export interface ICreateFakeOrderRequest {
  items: IFakeOrderItem[]
  email: string
  phone: string
  address: string
  userId: string
}

export interface IValidUserParams {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  shopProductId: string
} 