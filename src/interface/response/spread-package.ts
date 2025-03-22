export interface ISpreadPackage {
    id: string
    name: string
    description?: string
    price: number
    duration: number // in days
    impressions: number
    priority: number
    isActive: boolean
    features: string[]
    createdAt: string
    updatedAt: string
    image?: string
  }
  
  export interface ISpreadPackageListResponse {
    data: ISpreadPackage[]
    total: number
    page: number
    limit: number
  }
  
  export interface ISpreadPackageResponse {
    data: ISpreadPackage
  }
  
  