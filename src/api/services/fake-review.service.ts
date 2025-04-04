import { sendDelete, sendGet, sendPost } from "../apiClient"
import { ConfigFakeReviewEndPoint } from "./contants"

// Get user orders
export const getUserOrders = async (userId: string, status?: string): Promise<any> => {
  const res = await sendGet(ConfigFakeReviewEndPoint.GET_USER_ORDERS(userId), { status })
  return res
}

// Create fake review
export const createFakeReview = async (payload: any): Promise<any> => {
  const res = await sendPost(ConfigFakeReviewEndPoint.BASE, payload)
  return res
} 
// Delete fake review
export const deleteFakeReview = async (id: string): Promise<any> => {
  const res = await sendDelete(ConfigFakeReviewEndPoint.BASE, { id })
  return res
} 
