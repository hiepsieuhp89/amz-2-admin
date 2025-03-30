import {
  createFakeOrder,
  deliverFakeOrder,
  getValidUsers,
  getShopOrders,
  updateFakeOrder,
  deleteFakeOrder,
} from "@/api/services/fake-order.service"
import type {
  ICreateFakeOrderPayload,
  IValidUserParams,
  IShopOrderParams,
  IShopOrderResponse,
  IUpdateFakeOrderPayload,
} from "@/api/services/fake-order.service"
import { IValidUserListResponse } from "@/interface/response/fake-order"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query"

const VALID_USERS_KEY = "validUsers"
const SHOP_ORDERS_KEY = "shopOrders"

// Get valid users
export const useGetValidUsers = (
  params: IValidUserParams
): UseQueryResult<IValidUserListResponse> => {
  return useQuery({
    queryKey: [VALID_USERS_KEY, params],
    queryFn: () => getValidUsers(params),
    enabled: !!params.search,
  })
}

// Create fake order
export const useCreateFakeOrder = (): UseMutationResult<
  any,
  Error,
  ICreateFakeOrderPayload
> => {
  return useMutation({
    mutationFn: (payload: ICreateFakeOrderPayload) => createFakeOrder(payload),
  })
}

// Mark fake order as delivered
export const useDeliverFakeOrder = (): UseMutationResult<any, Error, string> => {
  return useMutation({
    mutationFn: (id: string) => deliverFakeOrder(id),
  })
}

// Get shop orders
export const useGetShopOrders = (
  params: IShopOrderParams
): UseQueryResult<IShopOrderResponse> => {
  return useQuery({
    queryKey: [SHOP_ORDERS_KEY, params],
    queryFn: () => getShopOrders(params),
    enabled: !!params.shopId,
  })
}

// Update fake order
export const useUpdateFakeOrder = (): UseMutationResult<any, Error, { orderId: string; payload: IUpdateFakeOrderPayload }> => {
  return useMutation({
    mutationFn: ({ orderId, payload }) => updateFakeOrder(orderId, payload),
  });
}

// Delete fake order
export const useDeleteFakeOrder = (): UseMutationResult<any, Error, string> => {
  return useMutation({
    mutationFn: (orderId: string) => deleteFakeOrder(orderId),
  });
} 