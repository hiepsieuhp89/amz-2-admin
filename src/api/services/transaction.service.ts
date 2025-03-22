import { sendGet, sendPost } from "../apiClient"
import { ConfigTransactionEndPoint } from "./contants"
import type { IRechargeRequest, ITransactionHistoryParams, IWithdrawRequest } from "@/interface/request/transaction"
import type { IRechargeResponse, ITransactionListResponse, IWithdrawResponse } from "@/interface/response/transaction"

// Lấy lịch sử giao dịch
export const getTransactionHistory = async (params?: ITransactionHistoryParams): Promise<ITransactionListResponse> => {
  const res = await sendGet(ConfigTransactionEndPoint.HISTORY, params)
  return res
}

// Nạp tiền
export const rechargeTransaction = async (payload: IRechargeRequest): Promise<IRechargeResponse> => {
  const res = await sendPost(ConfigTransactionEndPoint.RECHARGE, payload)
  return res
}

// Rút tiền
export const withdrawTransaction = async (payload: IWithdrawRequest): Promise<IWithdrawResponse> => {
  const res = await sendPost(ConfigTransactionEndPoint.WITHDRAW, payload)
  return res
} 