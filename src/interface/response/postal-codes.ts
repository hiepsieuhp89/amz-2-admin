export interface IPostalCode {
  id: string
  code: string
  districtId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  data: any
}

export interface IPostalCodeResponse {
  status: boolean
  message: string
  data: IPostalCode
}

export interface IPostalCodesResponse {
  status: boolean
  message: string
  data: {
    data: IPostalCode[]
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