import { IPaymentStatistics } from "@/types/payment";
import apiClient from "../apiClient";


const ConfigUserEndPoint = {
    PAYMENT: "/payments",
    PAYMENT_STATISTICS: "/payments/statistics-summary",
    PAYMENT_STATISTICS_DETAIL: "/payments/statistics-detail",
    PAYMENT_STATISTICS_DEPOSIT_DETAIL: "/payments/statistics-deposit-detail",
    PAYMENT_STATISTICS_WITHDRAWAL_DETAIL: "/payments/statistics-withdrawal-detail",
    PAYMENT_DEPOSIT_TRANSACTION: "/payments/deposit-transactions",
    PAYMENT_DEPOSIT_TRANSACTION_ID: (id: string) =>  `/payments/deposit-transactions/${id}`,
    PAYMENT_WITHDRAWAL_TRANSACTION: "/payments/withdrawal-transactions",
    PAYMENT_TRANSACTION_ID: (id: string) => `/payments/${id}`,
    PAYMENT_TOP_DEPOSITORS: "/payments/top-depositors",
    PAYMENT_TOTAL_DEPOSIT_AMOUNT_8_DAYS: "/payments/total-deposit-amount-8-days",
    PAYMENT_TOTAL_WITHDRAWAL_AMOUNT_8_DAYS: "/payments/total-withdrawal-amount-8-days",
};

interface IParamsStartDateAndEndDate {
    endDate: string,
    StartDate: string
}

const getPaymentsStatisticsSummary = async (params: IParamsStartDateAndEndDate): Promise<IPaymentStatistics> => {
    const response = await apiClient.get({
        url: ConfigUserEndPoint.PAYMENT_STATISTICS,
        params
    },

    );
    return response?.data;
};

const getPaymentsStatisticsDetail = async (params: IParamsStartDateAndEndDate): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_STATISTICS_DETAIL}`,
        params
    });
    return response?.data;
};

const getPaymentDepositDetail = async (params: IParamsStartDateAndEndDate): Promise<any> => {
    const response = await apiClient.get({
        url: ConfigUserEndPoint.PAYMENT_STATISTICS_DEPOSIT_DETAIL,
        params
    });
    return response?.data;
};

const getPaymentWithdrawalDetail = async (
    params: any
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_STATISTICS_WITHDRAWAL_DETAIL}`,
        params,
    });
    return response?.data;
};

const getPaymentDepositTransaction = async (
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_DEPOSIT_TRANSACTION}`,
    });
    return response?.data;
};

const getPaymentDepositTransactionById = async (
    id: string
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_DEPOSIT_TRANSACTION_ID(id)}`,
    });
    return response?.data;
};

const updateDepositTransaction = async (id: string, payload: any): Promise<any> => {
    const response = await apiClient.patch({
        url: `${ConfigUserEndPoint.PAYMENT_DEPOSIT_TRANSACTION_ID(id)}`,
        data: payload
    });
    return response?.data;
};


const getPaymentWithdrawalTransaction = async (
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_WITHDRAWAL_TRANSACTION}`,
    });
    return response?.data;
};


const getPaymentTransactionById = async (id: string
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_TRANSACTION_ID(id)}`,
    });
    return response?.data;
};

const updateTransaction = async (id: string, payload: any): Promise<any> => {
    const response = await apiClient.put({
        url: `${ConfigUserEndPoint.PAYMENT_TRANSACTION_ID(id)}`,
        data: payload
    });
    return response?.data;
};

const getPaymentTopDepositors = async (
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_TOP_DEPOSITORS}`,
    });
    return response?.data;
};

const getPaymentTopDepositAmount = async (
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_TOTAL_DEPOSIT_AMOUNT_8_DAYS}`,
    });
    return response?.data;
};


const getPaymentTopWithdrawalAmount = async (
): Promise<any> => {
    const response = await apiClient.get({
        url: `${ConfigUserEndPoint.PAYMENT_TOTAL_WITHDRAWAL_AMOUNT_8_DAYS}`,
    });
    return response?.data;
};


const postAppovePayment = async (paymentId: string): Promise<any> => {
  const response = await apiClient.post({
    url: `${ConfigUserEndPoint.PAYMENT}/${paymentId}/approveCashout`,
  });
  return response?.data;
};



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getPaymentsStatisticsSummary,
    getPaymentsStatisticsDetail,
    getPaymentDepositDetail,
    getPaymentWithdrawalDetail,
    getPaymentDepositTransaction,
    getPaymentWithdrawalTransaction,
    getPaymentTopDepositors,
    getPaymentTopDepositAmount,
    getPaymentTopWithdrawalAmount,
    postAppovePayment,
    getPaymentDepositTransactionById,
    getPaymentTransactionById,
    updateTransaction,
    updateDepositTransaction
};
