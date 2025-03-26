export interface IAddCountryRequest {
  name: string
  code: string
  description?: string
  isActive: boolean
}

export interface IGetCountriesRequest {
  order?: string
  page?: number
  take?: number
  search?: string
  status?: string
}

export interface IUpdateCountryRequest {
  name?: string
  code?: string
  description?: string
  isActive?: boolean
} 