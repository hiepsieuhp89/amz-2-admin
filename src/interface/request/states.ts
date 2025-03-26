export interface IAddStateRequest {
  name: string
  code: string
  countryId: string
  description?: string
  isActive: boolean
}

export interface IGetStatesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
  countryId?: string
}

export interface IUpdateStateRequest {
  name?: string
  code?: string
  description?: string
  isActive?: boolean
} 