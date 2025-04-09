export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  REJECTED = "rejected",
  APPROVED = "approved"
}

export enum TransactionType {
  PACKAGE_PURCHASE = "package_purchase",
  PACKAGE_SPREAD = "package_spread",
  PACKAGE_REFUND = "package_refund",
  ORDER_PAYMENT = "order_payment",
  ORDER_PROFIT = "order_profit",
  RECHARGE = "recharge",
  WITHDRAW = "withdraw"
}

export interface ITransactionHistoryParams {
  page?: number
  take?: number
  status?: TransactionStatus
  type?: TransactionType
  userId?: string
}

export interface IRechargeRequest {
  amount: number
  bankName: string
  bankCode: string
  accountNumber: string
  accountName: string
  withdrawPassword: string
}

export interface IWithdrawRequest {
  bankName: string
  bankCode: string
  accountNumber: string
  accountName: string
  amount: number
  withdrawPassword: string
} 