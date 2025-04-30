/* eslint-disable import/no-anonymous-default-export */
import { sendGet, sendPut, sendPost } from "../apiClient"
import { ConfigEmailTemplateEndPoint } from "./contants"

// Get all email templates
export const getAllEmailTemplates = async (params?: {
  order?: "ASC" | "DESC"
  page?: number
  take?: number
  search?: string
  type?: string
}): Promise<any> => {
  const res = await sendGet(ConfigEmailTemplateEndPoint.BASE, {
    order: params?.order,
    page: params?.page,
    take: params?.take,
    search: params?.search && params.search.length > 0 ? params.search : undefined,
    type: params?.type && params.type.length > 0 ? params.type : undefined,
  })
  return res
}

// Get email template by type
export const getEmailTemplateByType = async (type: string): Promise<any> => {
  const res = await sendGet(ConfigEmailTemplateEndPoint.GET_BY_TYPE(type), {
    withCredentials: true,
  })
  return res
}

// Update email template
export const updateEmailTemplate = async (type: string, payload: any): Promise<any> => {
  const res = await sendPut(ConfigEmailTemplateEndPoint.UPDATE(type), payload)
  return res
}

// Send email by template type
export const sendEmailByTemplate = async (payload: { userId: string; templateType: string }): Promise<any> => {
  const res = await sendPost(ConfigEmailTemplateEndPoint.SEND, payload)
  return res
} 