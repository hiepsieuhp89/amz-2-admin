import { sendGet, sendPost } from "../apiClient";
import { ConfigOrderEndPoint } from "./constants";
import { IUpdateDeliveryStageRequest, IAddDelayMessageRequest } from "../../interface/request/order";
import { IOrderDetailResponse, IDeliveryStagesResponse } from "../../interface/response/order";

// Get order detail
export const getOrderDetail = async (id: string): Promise<IOrderDetailResponse> => {
  const res = await sendGet(ConfigOrderEndPoint.GET_BY_ID(id));
  return res;
};

// Update delivery stage
export const updateDeliveryStage = async (id: string, payload: IUpdateDeliveryStageRequest) => {
  const res = await sendPost(ConfigOrderEndPoint.UPDATE_DELIVERY_STAGE(id), payload);
  return res;
};

// Get delivery stages
export const getDeliveryStages = async (status?: string): Promise<IDeliveryStagesResponse> => {
  const url = status ? `${ConfigOrderEndPoint.GET_DELIVERY_STAGES}?status=${status}` : ConfigOrderEndPoint.GET_DELIVERY_STAGES;
  const res = await sendGet(url);
  return res;
};

// Add delay message
export const addDelayMessage = async (orderId: string, payload: IAddDelayMessageRequest) => {
  const res = await sendPost(ConfigOrderEndPoint.ADD_DELAY_MESSAGE(orderId), payload);
  return res;
}; 