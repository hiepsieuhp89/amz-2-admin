export interface IAddPostalCodeRequest {
  code: string
  districtId: string
  isActive: boolean
}

export interface IGetPostalCodesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  districtId?: string
}

export interface IUpdatePostalCodeRequest {
  code?: string
  districtId?: string
  isActive?: boolean
} 