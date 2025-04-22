import { sendGet } from "../apiClient"
import { ConfigActionLogEndPoint } from "./contants"

// Get user action logs
export const getUserActionLogs = async (userId: string, params?: any): Promise<any> => {
  const res = await sendGet(ConfigActionLogEndPoint.USER_LOGS(userId), params)
  return res
}

// Get all action logs (admin only)
export const getAllActionLogs = async (params?: any): Promise<any> => {
  const res = await sendGet(ConfigActionLogEndPoint.BASE, params)
  return res
} 