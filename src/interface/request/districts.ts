export interface IAddDistrictRequest {
  name: string
  code: string
  description?: string
  isActive: boolean
}

export interface IGetDistrictsRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  cityId?: string
}

export interface IUpdateDistrictRequest {
  name?: string
  code?: string
  description?: string
  isActive?: boolean
} 