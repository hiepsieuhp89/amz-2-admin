import { sendPost, sendGet, sendPatch, sendDelete } from "@/api/apiClient"
import { IAddStateRequest, IGetStatesRequest, IUpdateStateRequest } from "@/interface/request/states"
import { IStateResponse, IStatesResponse } from "@/interface/response/states"

export const addState = async (payload: IAddStateRequest): Promise<IStateResponse> => {
  const res = await sendPost("/admin/states", payload)
  return res
}

export const getStates = async (params?: IGetStatesRequest): Promise<IStatesResponse> => {
  const res = await sendGet("/admin/states", params)
  return res
}

export const getStateById = async (id: string): Promise<IStateResponse> => {
  const res = await sendGet(`/admin/states/${id}`)
  return res
}

export const updateState = async (id: string, payload: IUpdateStateRequest): Promise<IStateResponse> => {
  const res = await sendPatch(`/admin/states/${id}`, payload)
  return res
}

export const deleteState = async (id: string): Promise<IStateResponse> => {
  const res = await sendDelete(`/admin/states/${id}`)
  return res
} 