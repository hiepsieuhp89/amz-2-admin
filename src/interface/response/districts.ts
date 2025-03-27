export interface IDistrict {
  id: string
  name: string
  code: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  data: any
}

export interface IDistrictResponse {
  status: boolean
  message: string
  data: IDistrict
}

export interface IDistrictsResponse {
  status: boolean
  message: string
  data: {
    data: IDistrict[]
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