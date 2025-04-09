export const ConfigOrderEndPoint = {
  BASE: "/admin/orders",
  GET_BY_ID: (id: string) => `/admin/orders/${id}`,
  UPDATE_DELIVERY_STAGE: (id: string) => `/admin/orders/${id}/delivery-stage`,
  GET_DELIVERY_STAGES: "/admin/orders/delivery-stages",
  ADD_DELAY_MESSAGE: (orderId: string) => `/admin/orders/${orderId}/delay`,
}; 