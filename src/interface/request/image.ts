export interface ICreateImageInfo {
    title?: string
    description?: string
    alt?: string
    productId?: string
    isMain?: boolean
    tags?: string[]
    // Add any other fields that might be needed for image info creation
  }
  
  export interface IUpdateImageInfo {
    title?: string
    description?: string
    alt?: string
    isMain?: boolean
    tags?: string[]
  }
  
  export interface IUploadImageParams {
    file: File
    productId?: string
    isMain?: boolean
    title?: string
    description?: string
    alt?: string
    isPublic?: boolean
  }
  
  