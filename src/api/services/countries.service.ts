import { sendPost, sendGet, sendPatch, sendDelete } from "@/api/apiClient"
import { IAddCountryRequest, IGetCountriesRequest, IUpdateCountryRequest } from "@/interface/request/countries"
import { ICountryResponse, ICountriesResponse } from "@/interface/response/countries"

export const addCountry = async (payload: IAddCountryRequest): Promise<ICountryResponse> => {
  const res = await sendPost("/admin/countries", payload)
  return res
}

export const getCountries = async (params?: IGetCountriesRequest): Promise<ICountriesResponse> => {
  const res = await sendGet("/admin/countries", params)
  return res
}

export const getCountryById = async (id: string): Promise<ICountryResponse> => {
  const res = await sendGet(`/admin/countries/${id}`)
  return res
}

export const updateCountry = async (id: string, payload: IUpdateCountryRequest): Promise<ICountryResponse> => {
  const res = await sendPatch(`/admin/countries/${id}`, payload)
  return res
}

export const deleteCountry = async (id: string): Promise<ICountryResponse> => {
  const res = await sendDelete(`/admin/countries/${id}`)
  return res
} 