export interface IState {
  id: string
  name: string
  code: string
  countryId: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  data: any
}

export interface IStateResponse {
  status: boolean
  message: string
  data: IState
}

export interface IStatesResponse {
  status: boolean
  message: string
  data: {
    data: IState[]
    meta: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
} 