export interface ICreateSellerPackage {
    name: string
    description?: string
    price?: number
    duration?: number 
    productLimit?: number
    features?: string[]
    isActive?: boolean
  }
  
  export interface IUpdateSellerPackage {
    name?: string
    description?: string
    price?: number
    duration?: number 
    productLimit?: number
    features?: string[]
    isActive?: boolean
  }
  
  