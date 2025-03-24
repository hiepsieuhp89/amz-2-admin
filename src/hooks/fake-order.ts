import {
  createFakeOrder,
  deliverFakeOrder,
  getValidUsers,
} from "@/api/services/fake-order.service"
import type {
  ICreateFakeOrderPayload,
  IValidUserParams,
} from "@/api/services/fake-order.service"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query"

// Query keys
const VALID_USERS_KEY = "validUsers"
const FAKE_ORDERS_KEY = "fakeOrders"

// Get valid users
export const useGetValidUsers = (
  params: IValidUserParams
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [VALID_USERS_KEY, params],
    queryFn: () => getValidUsers(params),
    enabled: !!params.shopProductId,
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