/* eslint-disable import/no-anonymous-default-export */
import { sendDelete, sendGet, sendPost } from "../apiClient"
import { ConfigAdminChatEndPoint } from "./contants"

// Gửi tin nhắn
export const sendMessage = async (
  userId: string,
  shopId: string,
  message: string,
  imageUrls?: string[],
  shopProductId?: string
): Promise<void> => {
  await sendPost(ConfigAdminChatEndPoint.SEND_MESSAGE(userId, shopId), { 
    message,
    imageUrls,
    shopProductId
  })
}

// Lấy danh sách tin nhắn
export const getMessages = async (
  userId: string,
  shopId: string
): Promise<any> => {
  const res = await sendGet(ConfigAdminChatEndPoint.GET_MESSAGES(userId, shopId))
  return res
}

// Đánh dấu đã đọc
export const markAsRead = async (messageId: string): Promise<void> => {
  await sendPost(ConfigAdminChatEndPoint.MARK_AS_READ(messageId))
}

// Xóa tin nhắn
export const deleteMessage = async (messageId: string): Promise<void> => {
  await sendDelete(ConfigAdminChatEndPoint.DELETE_MESSAGE(messageId))
}

// Lấy danh sách người dùng của shop
export const getShopUsers = async (
  shopId: string,
  params?: {
    order?: "ASC" | "DESC";
    page?: number;
    take?: number;
    search?: string;
    sortBy?: string;
  }
): Promise<any> => {
  const res = await sendGet(ConfigAdminChatEndPoint.GET_SHOP_USERS(shopId), {
    order: params?.order,
    page: params?.page,
    take: params?.take,
    search: params?.search && params.search.length > 0 ? params.search : undefined,
    sortBy: params?.sortBy && params.sortBy.length > 0 ? params.sortBy : undefined,
  });
  return res;
};