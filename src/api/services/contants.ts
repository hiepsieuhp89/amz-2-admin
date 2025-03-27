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

export const ConfigImageEndPoint = {
  BASE: "/images",
  UPLOAD: "/upload",
  GET_BY_ID: (id: string) => `/images/${id}`,
  UPDATE: (id: string) => `/images/${id}`,
  DELETE: (id: string) => `/images/${id}`,
  GET_PRODUCT_IMAGES: (productId: string) => `/images/product/${productId}`,
  DELETE_PRODUCT_IMAGE_LINK: (id: string) => `/images/product-image/${id}`,
  GET_IMAGE_FILE: (filename: string) => `/images/file/${filename}`,
};

export const ConfigSpreadPackageEndPoint = {
  BASE: "/admin/spread-packages",
  GET_BY_ID: (id: string) => `/admin/spread-packages/${id}`,
  UPDATE: (id: string) => `/admin/spread-packages/${id}`,
  DELETE: (id: string) => `/admin/spread-packages/${id}`,
}

export const ConfigProductEndPoint = {
  BASE: "/admin/products",
  GET_BY_ID: (id: string) => `/admin/products/${id}`,
  UPDATE: (id: string) => `/admin/products/${id}`,
  DELETE: (id: string) => `/admin/products/${id}`,
};


export const ConfigUserEndPoint = {
  BASE: "/admin/users",
  GET_BY_ID: (id: string) => `/admin/users/${id}`,
  UPDATE: (id: string) => `/admin/users/${id}`,
  DELETE: (id: string) => `/admin/users/${id}`,
};

export const ConfigTransactionEndPoint = {
  BASE: "/transaction",
  HISTORY: "/transaction/history",
  RECHARGE: "/transaction/recharge",
  WITHDRAW: "/transaction/withdraw",
};

export const ConfigFakeOrderEndPoint = {
  BASE: "/admin/fake-orders",
  VALID_USERS: "/admin/fake-orders/valid-users",
  DELIVER: (id: string) => `/admin/fake-orders/${id}/deliver`,
};

export const ConfigShopProductEndPoint = {
  BASE: "/admin/shop-products",
  GET_BY_ID: (id: string) => `/admin/shop-products/${id}`,
  UPDATE: (id: string) => `/admin/shop-products/${id}`,
  DELETE: (id: string) => `/admin/shop-products/${id}`,
};

export const ConfigCountryEndPoint = {
  BASE: "/admin/countries",
  GET_BY_ID: (id: string) => `/admin/countries/${id}`
}

export const ConfigStateEndPoint = {
  BASE: "/admin/states",
  GET_BY_ID: (id: string) => `/admin/states/${id}`
}

export const ConfigCityEndPoint = {
  BASE: "/admin/cities",
  GET_BY_ID: (id: string) => `/admin/cities/${id}`
}

export const ConfigDistrictEndPoint = {
  BASE: "/admin/districts",
  GET_BY_ID: (id: string) => `/admin/districts/${id}`
}

export const ConfigPostalCodeEndPoint = {
  BASE: "/admin/postal-codes",
  GET_BY_ID: (id: string) => `/admin/postal-codes/${id}`
}