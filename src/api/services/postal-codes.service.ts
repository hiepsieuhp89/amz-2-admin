import { sendPost, sendGet, sendPatch, sendDelete } from "@/api/apiClient"
import { IAddPostalCodeRequest, IGetPostalCodesRequest, IUpdatePostalCodeRequest } from "@/interface/request/postal-codes"
import { IPostalCodeResponse, IPostalCodesResponse } from "@/interface/response/postal-codes"

export const addPostalCode = async (payload: IAddPostalCodeRequest): Promise<IPostalCodeResponse> => {
  const res = await sendPost("/admin/postal-codes", payload)
  return res
}

export const getPostalCodes = async (params?: IGetPostalCodesRequest): Promise<IPostalCodesResponse> => {
  const res = await sendGet("/admin/postal-codes", params)
  return res
}

export const getPostalCodeById = async (id: string): Promise<IPostalCodeResponse> => {
  const res = await sendGet(`/admin/postal-codes/${id}`)
  return res
}

export const updatePostalCode = async (id: string, payload: IUpdatePostalCodeRequest): Promise<IPostalCodeResponse> => {
  const res = await sendPatch(`/admin/postal-codes/${id}`, payload)
  return res
}

export const deletePostalCode = async (id: string): Promise<IPostalCodeResponse> => {
  const res = await sendDelete(`/admin/postal-codes/${id}`)
  return res
} 