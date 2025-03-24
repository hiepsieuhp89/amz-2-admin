import { sendGet, sendPost } from "../apiClient"
import { ConfigFakeOrderEndPoint } from "./contants"

export interface IValidUserParams {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  shopProductIds: string[]
}

export interface IFakeOrderItem {
  shopProductId: string
  quantity: number
}

export interface ICreateFakeOrderPayload {
  items: IFakeOrderItem[]
  email: string
  phone: string
  address: string
  userId: string
}

// Get valid users for fake order
export const getValidUsers = async (params: IValidUserParams) => {
  const res = await sendGet(ConfigFakeOrderEndPoint.VALID_USERS, params)
  return res
}

// Create fake order
export const createFakeOrder = async (payload: ICreateFakeOrderPayload) => {
  const res = await sendPost(ConfigFakeOrderEndPoint.BASE, payload)
  return res
}

// Mark fake order as delivered
export const deliverFakeOrder = async (id: string) => {
  const res = await sendPost(ConfigFakeOrderEndPoint.DELIVER(id))
  return res
} 