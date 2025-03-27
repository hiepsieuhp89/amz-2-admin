import { sendPost, sendGet, sendPatch, sendDelete } from "@/api/apiClient"
import { IAddDistrictRequest, IGetDistrictsRequest, IUpdateDistrictRequest } from "@/interface/request/districts"
import { IDistrictResponse, IDistrictsResponse } from "@/interface/response/districts"

export const addDistrict = async (payload: IAddDistrictRequest): Promise<IDistrictResponse> => {
  const res = await sendPost("/admin/districts", payload)
  return res
}

export const getDistricts = async (params?: IGetDistrictsRequest): Promise<IDistrictsResponse> => {
  const res = await sendGet("/admin/districts", params)
  return res
}

export const getDistrictById = async (id: string): Promise<IDistrictResponse> => {
  const res = await sendGet(`/admin/districts/${id}`)
  return res
}

export const updateDistrict = async (id: string, payload: IUpdateDistrictRequest): Promise<IDistrictResponse> => {
  const res = await sendPatch(`/admin/districts/${id}`, payload)
  return res
}

export const deleteDistrict = async (id: string): Promise<IDistrictResponse> => {
  const res = await sendDelete(`/admin/districts/${id}`)
  return res
} 