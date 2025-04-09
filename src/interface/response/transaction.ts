import { TransactionStatus, TransactionType } from "../request/transaction"

// Base interface cho metadata phân trang
interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

// Base interface cho response API
interface APIResponse<T> {
  message: string;
  statusCode: number;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
}

// Base interface cho transaction
interface BaseTransaction {
  id: number;           // Thay đổi type từ string sang number
  createdAt: string;
  userId: number;       // Thay đổi type từ string sang number
  bankAccountNumber: string;
  bankAccountName: string;
  realAmount: number;
  status: string;
}

// Interface cho giao dịch nạp tiền
interface IDepositTransaction extends BaseTransaction {
  type: 'recharge';     // Literal type cho nạp tiền
}

// Interface cho giao dịch rút tiền
interface IWithdrawalTransaction extends BaseTransaction {
  type: 'cashout';      // Literal type cho rút tiền
}

// Interface cho cập nhật trạng thái
interface IUpdateTransactionStatus {
  status: string;
  note?: string;
}

// Interface cho thống kê
interface IStatisticsSummary {
  totalDeposit: number;
  totalWithdrawal: number;
  totalUsers: number;
}

// Interface cho người nạp tiền nhiều nhất
interface ITopDepositor {
  userId: number;      // Thay đổi type từ string sang number
  username: string;
  totalAmount: number;
}

export interface ITransaction {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  money: string
  status: TransactionStatus
  description: string
  type: TransactionType
  referenceId: string | null
  userId: string
  data: any
}

export interface ITransactionListResponse {
  status: boolean
  message: string
  data: {
    data: ITransaction[]
    meta: any
  }
  errors: any | null
  timestamp: string
}

export interface ITransactionResponse {
  status: boolean
  message: string
  data: ITransaction
  errors: any | null
  timestamp: string
}

export interface IRechargeResponse extends ITransactionListResponse {}

export interface IWithdrawResponse extends ITransactionResponse {}

// Export tất cả các types
export type {
  PaginationMeta,
  APIResponse,
  BaseTransaction,
  IDepositTransaction,
  IWithdrawalTransaction,
  IUpdateTransactionStatus,
  IStatisticsSummary,
  ITopDepositor
}; 