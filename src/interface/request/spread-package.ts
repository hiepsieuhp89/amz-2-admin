export interface ICreateSpreadPackage {
    name: string
    description?: string
    price?: number
    duration?: number // in days
    impressions?: number
    priority?: number
    isActive?: boolean
    features?: string[]
  }
  
  export interface IUpdateSpreadPackage {
    name?: string
    description?: string
    price?: number
    duration?: number // in days
    impressions?: number
    priority?: number
    isActive?: boolean
    features?: string[]
  }
  
  