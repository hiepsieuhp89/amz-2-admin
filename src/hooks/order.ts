import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
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
import { getShopOrders, IShopOrderParams, IShopOrderResponse } from "@/api/services/fake-order.service";

const ORDER_DETAIL_KEY = "orderDetail";
const DELIVERY_STAGES_KEY = "deliveryStages";

// Get shop orders
export const useGetShopOrders = (
  params: IShopOrderParams
): UseQueryResult<IShopOrderResponse> => {
  return useQuery({
    queryKey: [ORDER_DETAIL_KEY, params],
    queryFn: () => getShopOrders(params),
    enabled: !!params.shopId,
  });
};
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
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }) => updateDeliveryStage(id, payload),
    onSuccess: (_, { id }) => {
      // Invalidate specific order detail
      queryClient.invalidateQueries({ queryKey: [ORDER_DETAIL_KEY, id] });
      // Invalidate all shop orders queries
      queryClient.invalidateQueries({ queryKey: [ORDER_DETAIL_KEY] });
    },
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, payload }) => addDelayMessage(orderId, payload),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: [ORDER_DETAIL_KEY, orderId] });
    },
  });
}; 