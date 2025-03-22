import { getTransactionHistory, rechargeTransaction, withdrawTransaction } from "@/api/services/transaction.service"
import type { IRechargeRequest, ITransactionHistoryParams, IWithdrawRequest } from "@/interface/request/transaction"
import type { IRechargeResponse, ITransactionListResponse, IWithdrawResponse } from "@/interface/response/transaction"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query"

// Query keys
const TRANSACTION_HISTORY_KEY = "transaction-history"
const TRANSACTION_KEY = "transaction"

// Lấy lịch sử giao dịch
export const useGetTransactionHistory = (params?: ITransactionHistoryParams): UseQueryResult<ITransactionListResponse> => {
  return useQuery({
    queryKey: [TRANSACTION_HISTORY_KEY, params],
    queryFn: () => getTransactionHistory(params),
  })
}

// Nạp tiền
export const useRechargeTransaction = (): UseMutationResult<IRechargeResponse, Error, IRechargeRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IRechargeResponse, Error, IRechargeRequest>({
    mutationFn: (payload: IRechargeRequest) => rechargeTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTION_HISTORY_KEY],
      })
    },
  })
}

// Rút tiền
export const useWithdrawTransaction = (): UseMutationResult<IWithdrawResponse, Error, IWithdrawRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IWithdrawResponse, Error, IWithdrawRequest>({
    mutationFn: (payload: IWithdrawRequest) => withdrawTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTION_HISTORY_KEY],
      })
    },
  })
} 