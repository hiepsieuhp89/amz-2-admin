import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient"
import { ConfigSpreadPackageEndPoint } from "./contants"
import type { ICreateSpreadPackage, IUpdateSpreadPackage } from "@/interface/request/spread-package"
import type { ISpreadPackageListResponse, ISpreadPackageResponse } from "@/interface/response/spread-package"

// Create a new spread package
export const createSpreadPackage = async (payload: ICreateSpreadPackage): Promise<ISpreadPackageResponse> => {
  const res = await sendPost(ConfigSpreadPackageEndPoint.BASE, payload)
  return res
}

// Get all spread packages
export const getAllSpreadPackages = async (params?: {
  page?: number
  limit?: number
}): Promise<ISpreadPackageListResponse> => {
  const res = await sendGet(ConfigSpreadPackageEndPoint.BASE, params)
  return res
}

// Get spread package by ID
export const getSpreadPackageById = async (id: string): Promise<ISpreadPackageResponse> => {
  const res = await sendGet(ConfigSpreadPackageEndPoint.GET_BY_ID(id))
  return res
}

// Update spread package
export const updateSpreadPackage = async (
  id: string,
  payload: IUpdateSpreadPackage,
): Promise<ISpreadPackageResponse> => {
  const res = await sendPatch(ConfigSpreadPackageEndPoint.UPDATE(id), payload)
  return res
}

// Delete spread package
export const deleteSpreadPackage = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigSpreadPackageEndPoint.DELETE(id))
  return res
}

