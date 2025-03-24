import { sendDelete, sendGet, sendPost, sendPut } from "../apiClient"
import { ConfigCategoryEndPoint } from "./contants"
import type { ICreateCategory } from "@/interface/request/category"
import type { ICategoryListResponse, ICategoryResponse } from "@/interface/response/category"

// Create a new category
export const createCategory = async (payload: ICreateCategory): Promise<ICategoryResponse> => {
  const res = await sendPost(ConfigCategoryEndPoint.BASE, payload)
  return res
}

// Get all categories
export const getAllCategories = async (params?: { page?: number; take?: number }): Promise<ICategoryListResponse> => {
  const res = await sendGet(ConfigCategoryEndPoint.BASE, params)
  return res
}

// Get category by ID
export const getCategoryById = async (id: string): Promise<ICategoryResponse> => {
  const res = await sendGet(ConfigCategoryEndPoint.GET_BY_ID(id))
  return res
}

// Update category
export const updateCategory = async (id: string, payload: ICreateCategory): Promise<ICategoryResponse> => {
  const res = await sendPut(ConfigCategoryEndPoint.UPDATE(id), payload)
  return res
}

// Delete category
export const deleteCategory = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigCategoryEndPoint.DELETE(id))
  return res
}

// Get category descendants
export const getCategoryDescendants = async (id: string): Promise<ICategoryListResponse> => {
  const res = await sendGet(ConfigCategoryEndPoint.GET_DESCENDANTS(id))
  return res
}

