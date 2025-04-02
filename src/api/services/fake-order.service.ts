import { sendGet, sendPost } from "../apiClient"
import { ConfigFakeOrderEndPoint } from "./contants"

export interface IValidUserParams {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
}

export interface IFakeOrderItem {
  shopProductId: string
  quantity: number
}

export interface ICreateFakeOrderPayload {
  items: IFakeOrderItem[]
  email?: string
  phone?: string
  address: string
  userId: string
}

export const getValidUsers = async (params: IValidUserParams) => {
  const res = await sendGet(ConfigFakeOrderEndPoint.VALID_USERS, params)
  return res
}

export const createFakeOrder = async (payload: ICreateFakeOrderPayload) => {
  const res = await sendPost(ConfigFakeOrderEndPoint.BASE, payload)
  return res
}

export const deliverFakeOrder = async (id: string) => {
  const res = await sendPost(ConfigFakeOrderEndPoint.DELIVER(id))
  return res
} 