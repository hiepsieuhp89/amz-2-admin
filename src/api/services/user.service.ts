/* eslint-disable import/no-anonymous-default-export */
import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient"
import { ConfigUserEndPoint, ConfigUserIpHistoryEndPoint } from "./contants"
import type { ICreateUser, IUpdateUser } from "@/interface/request/user"
import type { IUserListResponse, IUserResponse } from "@/interface/response/user"

// Create a new user
export const createUser = async (payload: ICreateUser): Promise<IUserResponse> => {
  const res = await sendPost(ConfigUserEndPoint.BASE, payload)
  return res
}

// Get all users
export const getAllUsers = async (params?: {
  order?: "ASC" | "DESC"
  page?: number
  take?: number
  search?: string
  status?: string
  role?: "shop" | "admin" | "user"
  hasShop?: boolean
}): Promise<IUserListResponse> => {
  const res = await sendGet(ConfigUserEndPoint.BASE, {
    order: params?.order,
    page: params?.page,
    take: params?.take,
    search: params?.search && params.search.length > 0 ? params.search : undefined,
    status: params?.status && params.status.length > 0 ? params.status : undefined,
    role: params?.role && params.role.length > 0 ? params.role : undefined,
    hasShop: params?.hasShop !== undefined ? params.hasShop.toString() : undefined
  })
  return res
}

// Get user by ID
export const getUserById = async (id: string): Promise<IUserResponse> => {
  const res = await sendGet(ConfigUserEndPoint.GET_BY_ID(id), {
    withCredentials: true,
  })
  return res
}

// Update user
export const updateUser = async (id: string, payload: IUpdateUser): Promise<IUserResponse> => {
  const res = await sendPatch(ConfigUserEndPoint.UPDATE(id), payload)
  return res
}

// Delete user
export const deleteUser = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigUserEndPoint.DELETE(id), { withCredentials: true })
  return res
}

// Get user IP history
export const getUserIpHistory = async (params: {
  userId: string;
  page?: number;
  take?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: string;
  ip?: string;
  action?: string;
}): Promise<any> => {
  const res = await sendGet(ConfigUserIpHistoryEndPoint.BASE, {
    userId: params.userId,
    page: params?.page,
    take: params?.take,
    order: params?.order,
    search: params?.search && params.search.length > 0 ? params.search : undefined,
    status: params?.status && params.status.length > 0 ? params.status : undefined,
    ip: params?.ip && params.ip.length > 0 ? params.ip : undefined,
    action: params?.action && params.action.length > 0 ? params.action : undefined,
  })
  return res
}

