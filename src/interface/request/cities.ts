export interface IAddCityRequest {
  name: string
  code: string
  stateId: string
  description?: string
  isActive: boolean
}

export interface IGetCitiesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  stateId?: string
}

export interface IUpdateCityRequest {
  name?: string
  code?: string
  description?: string
  isActive?: boolean
} 