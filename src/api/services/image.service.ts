import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient"
import { ConfigImageEndPoint } from "./contants"
import type { ICreateImageInfo, IUpdateImageInfo, IUploadImageParams } from "@/interface/request/image"
import type {
  IImageListResponse,
  IImageResponse,
  IProductImageListResponse,
  IUploadImageResponse,
} from "@/interface/response/image"

// Upload a new image
export const uploadImage = async (params: IUploadImageParams): Promise<IUploadImageResponse> => {
  const formData = new FormData()
  formData.append("file", params.file)

  // Add optional parameters if they exist
  if (params.productId) formData.append("productId", params.productId)
  if (params.isMain !== undefined) formData.append("isMain", params.isMain.toString())
  if (params.title) formData.append("title", params.title)
  if (params.description) formData.append("description", params.description)
  if (params.alt) formData.append("alt", params.alt)

  const res = await sendPost(ConfigImageEndPoint.UPLOAD, formData)
  return res
}

// Create image info
export const createImageInfo = async (payload: ICreateImageInfo): Promise<IImageResponse> => {
  const res = await sendPost(ConfigImageEndPoint.BASE, payload)
  return res
}

// Get all images
export const getAllImages = async (params?: {
  page?: number
  limit?: number
  tags?: string[]
}): Promise<IImageListResponse> => {
  const res = await sendGet(ConfigImageEndPoint.BASE, params)
  return res
}

// Get product images
export const getProductImages = async (
  productId: string,
  params?: { page?: number; limit?: number },
): Promise<IProductImageListResponse> => {
  const res = await sendGet(ConfigImageEndPoint.GET_PRODUCT_IMAGES(productId), params)
  return res
}

// Delete product image link
export const deleteProductImageLink = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigImageEndPoint.DELETE_PRODUCT_IMAGE_LINK(id))
  return res
}

// Get image by ID
export const getImageById = async (id: string): Promise<IImageResponse> => {
  const res = await sendGet(ConfigImageEndPoint.GET_BY_ID(id))
  return res
}

// Update image info
export const updateImageInfo = async (id: string, payload: IUpdateImageInfo): Promise<IImageResponse> => {
  const res = await sendPatch(ConfigImageEndPoint.UPDATE(id), payload)
  return res
}

// Delete image
export const deleteImage = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigImageEndPoint.DELETE(id))
  return res
}

// Get image file URL
export const getImageFileUrl = (filename: string): string => {
  return ConfigImageEndPoint.GET_IMAGE_FILE(filename)
}

