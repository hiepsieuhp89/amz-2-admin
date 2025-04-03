import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient";
import { ConfigNotificationEndPoint } from "./contants";

export const getNotifications = async (params?: {
  page?: number;
  take?: number;
  search?: string;
  order?: string;
  status?: string;
}): Promise<any> => {
  const res = await sendGet(ConfigNotificationEndPoint.BASE, params);
  return res;
};

export const createNotification = async (payload: any): Promise<any> => {
  const res = await sendPost(ConfigNotificationEndPoint.BASE, payload);
  return res;
};

export const deleteNotification = async (id: string): Promise<any> => {
  const res = await sendDelete(ConfigNotificationEndPoint.DELETE(id));
  return res;
};

export const markNotificationAsRead = async (id: string): Promise<any> => {
  const res = await sendPatch(ConfigNotificationEndPoint.MARK_AS_READ(id));
  return res;
}; 