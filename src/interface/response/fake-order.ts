export interface IFakeOrderResponse {
  id: string
}

export interface IValidUser {
  id: string
}

export interface IValidUserListResponse {
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