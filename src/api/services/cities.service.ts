import { sendPost, sendGet, sendPatch, sendDelete } from "@/api/apiClient"
import { IAddCityRequest, IGetCitiesRequest, IUpdateCityRequest } from "@/interface/request/cities"
import { ICityResponse, ICitiesResponse } from "@/interface/response/cities"

export const addCity = async (payload: IAddCityRequest): Promise<ICityResponse> => {
  const res = await sendPost("/admin/cities", payload)
  return res
}

export const getCities = async (params?: IGetCitiesRequest): Promise<ICitiesResponse> => {
  const res = await sendGet("/admin/cities", params)
  return res
}

export const getCityById = async (id: string): Promise<ICityResponse> => {
  const res = await sendGet(`/admin/cities/${id}`)
  return res
}

export const updateCity = async (id: string, payload: IUpdateCityRequest): Promise<ICityResponse> => {
  const res = await sendPatch(`/admin/cities/${id}`, payload)
  return res
}

export const deleteCity = async (id: string): Promise<ICityResponse> => {
  const res = await sendDelete(`/admin/cities/${id}`)
  return res
} 