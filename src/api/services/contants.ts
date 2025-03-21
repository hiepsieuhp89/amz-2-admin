export const ConfigAuthEndPoint = {
  LOGIN: "/auth/login",
  PROFILE: "/auth/profile",
  REGISTER: "/auth/register",
  FORGOT_PASSSWORD: "/auth/forgot-password",
  RESET_PASSSWORD: "/auth/reset-password",
  ME: "/auth/me",
  WITH_DRAWAL_CONDITION: "/auth/getWithdrawalCondition",
  UPDATE_WITHDRAWAL_PASSWORD: "/auth/updateWithdrawPassword",
  CHANGE_PASSSWORD: "/auth/change-password",
  UPDATE_USER_INFO: "/auth/updateUserInfo",
  GET_BALANCE: "/auth/getBalance",
  STATISTICS_SUMMARY: "/payments/statistics-summary",
  STATISTICS_DETAIL: "/payments/statistics-detail",
  STATISTICS_DEPOSIT_DETAIL: "/payments/statistics-deposit-detail",
  STATISTICS_WITHDRAWAL_DETAIL: "/payments/statistics-withdrawal-detail",
  STATISTICS_TOP_DEPOSITORS: "/payments/top-depositors",
  TOTAL_WITHDRAWAL_AMOUNT_8_DAYS: "/payments/total-withdrawal-amount-8-days",
  TOTAL_DEPOSIT_AMOUNT_8_DAYS: "/payments/total-deposit-amount-8-days",
};

export const ConfigCategoryEndPoint = {
  BASE: "/admin/categories",
  GET_BY_ID: (id: string) => `/admin/categories/${id}`,
  UPDATE: (id: string) => `/admin/categories/${id}`,
  DELETE: (id: string) => `/admin/categories/${id}`,
  GET_DESCENDANTS: (id: string) => `/admin/categories/${id}/descendants`,
}


export const ConfigSellerPackageEndPoint = {
  BASE: "/admin/seller-packages",
  GET_BY_ID: (id: string) => `/admin/seller-packages/${id}`,
  UPDATE: (id: string) => `/admin/seller-packages/${id}`,
  DELETE: (id: string) => `/admin/seller-packages/${id}`,
}