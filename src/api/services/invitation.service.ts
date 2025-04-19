import { sendGet, sendPost, sendPut, sendDelete, sendPatch } from "../apiClient"
import { ConfigInvitationCodeEndPoint } from "./contants"

// Tạo mã mời mới (chỉ dành cho admin và super admin)
export const createInvitationCodes = async (payload: any): Promise<any> => {
  const res = await sendPost(ConfigInvitationCodeEndPoint.CREATE, payload)
  return res
}

// Lấy danh sách mã mời đã tạo
export const getMyInvitationCodes = async (params?: any): Promise<any> => {
  const res = await sendGet(ConfigInvitationCodeEndPoint.MY_CODES, params)
  return res
}

// Lấy thông tin mã mời theo ID
export const getInvitationCodeById = async (id: string): Promise<any> => {
  const res = await sendGet(ConfigInvitationCodeEndPoint.GET_BY_ID(id))
  return res
}

// Lấy tất cả mã mời (Admin only)
export const getAllInvitationCodes = async (params?: any): Promise<any> => {
  const res = await sendGet(ConfigInvitationCodeEndPoint.MY_CODES, params)
  return res
}

// Xóa mã mời
export const deleteInvitationCode = async (id: string): Promise<any> => {
  const res = await sendDelete(ConfigInvitationCodeEndPoint.GET_BY_ID(id))
  return res
}

// Hủy kích hoạt mã mời
export const deactivateInvitationCode = async (code: string): Promise<any> => {
  const res = await sendPatch(ConfigInvitationCodeEndPoint.DEACTIVATE, { code })
  return res
} 