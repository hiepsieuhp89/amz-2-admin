export interface ICountry {
  id: string
  name: string
  code: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ICountryResponse {
  status: boolean
  message: string
  data: ICountry
}

export interface ICountriesResponse {
  status: boolean
  message: string
  data: {
    data: ICountry[]
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