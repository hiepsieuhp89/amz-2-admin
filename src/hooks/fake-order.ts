import {
  createFakeOrder,
  deliverFakeOrder,
  getValidUsers,
} from "@/api/services/fake-order.service"
import type {
  ICreateFakeOrderPayload,
  IValidUserParams,
} from "@/api/services/fake-order.service"
import { IValidUserListResponse } from "@/interface/response/fake-order"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query"

const VALID_USERS_KEY = "validUsers"

// Get valid users
export const useGetValidUsers = (
  params: IValidUserParams
): UseQueryResult<IValidUserListResponse> => {
  return useQuery({
    queryKey: [VALID_USERS_KEY, params],
    queryFn: () => getValidUsers(params),
    enabled: !!params.shopProductIds,
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