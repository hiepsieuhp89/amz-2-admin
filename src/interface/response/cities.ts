export interface ICity {
  id: string
  name: string
  code: string
  stateId: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  data: any
}

export interface ICityResponse {
  status: boolean
  message: string
  data: ICity
}

export interface ICitiesResponse {
  status: boolean
  message: string
  data: {
    data: ICity[]
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