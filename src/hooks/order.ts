import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import {
  getOrderDetail,
  updateDeliveryStage,
  getDeliveryStages,
  addDelayMessage,
} from "@/api/services/order.service";
import type { 
  IOrderDetailResponse,
  IDeliveryStagesResponse,
} from "@/interface/response/order";
import type {
  IUpdateDeliveryStageRequest,
  IAddDelayMessageRequest,
} from "@/interface/request/order";

const ORDER_DETAIL_KEY = "orderDetail";
const DELIVERY_STAGES_KEY = "deliveryStages";

// Get order detail
export const useGetOrderDetail = (
  id: string
): UseQueryResult<IOrderDetailResponse> => {
  return useQuery({
    queryKey: [ORDER_DETAIL_KEY, id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id,
  });
};

// Update delivery stage
export const useUpdateDeliveryStage = (): UseMutationResult<
  any,
  Error,
  { id: string; payload: IUpdateDeliveryStageRequest }
> => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateDeliveryStage(id, payload),
  });
};

// Get delivery stages
export const useGetDeliveryStages = (
  status?: "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED"
): UseQueryResult<IDeliveryStagesResponse> => {
  return useQuery({
    queryKey: [DELIVERY_STAGES_KEY, status],
    queryFn: () => getDeliveryStages(status),
  });
};

// Add delay message
export const useAddDelayMessage = (): UseMutationResult<
  any,
  Error,
  { orderId: string; payload: IAddDelayMessageRequest }
> => {
  return useMutation({
    mutationFn: ({ orderId, payload }) => addDelayMessage(orderId, payload),
  });
}; 