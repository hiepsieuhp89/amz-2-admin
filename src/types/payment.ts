export interface IPaymentStatistics {
    totalDeposit: number
    totalWithdrawal: number
    profit: number
}


// types/payment.ts
export interface IDepositTransactionParams {
    page: number;
    limit: number;
    startDate?: string;
    endDate?: string;
    userId?: string;
    username?: string;
    paymentMethod?: string;
    status?: string;
    transactionId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  