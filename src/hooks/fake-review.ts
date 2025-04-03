import { getUserOrders, createFakeReview, deleteFakeReview } from "@/api/services/fake-review.service"
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult, useQueryClient } from "@tanstack/react-query"

// Query keys
const USER_ORDERS_KEY = "user-orders"
const FAKE_REVIEW_KEY = "fake-review"

// Get user orders
export const useGetUserOrders = (userId: string, status?: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: [USER_ORDERS_KEY, userId, status],
    queryFn: () => getUserOrders(userId, status),
    enabled: !!userId
  })
}

// Create fake review
export const useCreateFakeReview = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient()
  
  return useMutation<any, Error, any>({
    mutationFn: (payload: any) => createFakeReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_ORDERS_KEY],
      })
    }
  })
} 

// Delete fake review
export const useDeleteFakeReview = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, any>({
    mutationFn: (id: string) => deleteFakeReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_ORDERS_KEY],
      })
    }
  })
}

