export interface IFakeOrderResponse {
  id: string
}

export interface IValidUser {
  id: string
  username: string
  email: string
  fullName: string
  balance: string
}

export interface IValidUserListResponse {
  status: boolean
  message: string
  data: {
    data: IValidUser[]
    meta: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
  errors: null
  timestamp: string
} 