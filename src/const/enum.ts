const limit = 20;
export { limit };

export const statusListCode = [
  {
    value: "UNUSED",
    label: "Chưa dùng",
  },
  {
    value: "USED",
    label: "Đã dùng",
  },
  {
    value: "EXPIRED",
    label: "Hết hạn",
  },
  {
    value: "LOCKED",
    label: "Bị khóa",
  },
];

export enum ConfigKeyId {
  general = 0,
  CASH_RATE = 1,
  TURN_OVER_RATE = 2,
  CSKH_CHAT_ID = 3,
  proxy_host = 4,
  proxy_port = 5,
  proxy_user_name = 6,
  proxy_user_password = 7,
  agency = 8,
}

export enum PaymentStatusUpdate {
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success',
  REJECT = 'reject',
}
