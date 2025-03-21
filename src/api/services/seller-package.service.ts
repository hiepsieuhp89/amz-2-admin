/* eslint-disable import/no-anonymous-default-export */
import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient"
import { ConfigSellerPackageEndPoint } from "./contants"
import type { ICreateSellerPackage, IUpdateSellerPackage } from "@/interface/request/seller-package"
import type { ISellerPackageListResponse, ISellerPackageResponse } from "@/interface/response/seller-package"

// Create a new seller package
export const createSellerPackage = async (payload: ICreateSellerPackage): Promise<ISellerPackageResponse> => {
  const res = await sendPost(ConfigSellerPackageEndPoint.BASE, payload)
  return res
}

// Get all seller packages
export const getAllSellerPackages = async (params?: {
  page?: number
  limit?: number
}): Promise<ISellerPackageListResponse> => {
  const res = await sendGet(ConfigSellerPackageEndPoint.BASE, params)
  return res
}

// Get seller package by ID
export const getSellerPackageById = async (id: string): Promise<ISellerPackageResponse> => {
  const res = await sendGet(ConfigSellerPackageEndPoint.GET_BY_ID(id))
  return res
}

// Update seller package
export const updateSellerPackage = async (
  id: string,
  payload: IUpdateSellerPackage,
): Promise<ISellerPackageResponse> => {
  const res = await sendPatch(ConfigSellerPackageEndPoint.UPDATE(id), payload)
  return res
}

// Delete seller package
export const deleteSellerPackage = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigSellerPackageEndPoint.DELETE(id))
  return res
}

