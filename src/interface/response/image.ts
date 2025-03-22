export interface IImage {
    id: string
    filename: string
    originalName?: string
    path: string
    url: string
    title?: string
    description?: string
    alt?: string
    mimeType: string
    size: number
    width?: number
    height?: number
    isMain?: boolean
    tags?: string[]
    productId?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface IImageListResponse {
    data: IImage[]
    total: number
    page: number
    limit: number
  }
  
  export interface IImageResponse {
    data: IImage
  }
  
  export interface IUploadImageResponse {
    data: IImage
    success: boolean
    message?: string
  }
  
  export interface IProductImageLink {
    id: string
    imageId: string
    productId: string
    isMain: boolean
    image: IImage
  }
  
  export interface IProductImageListResponse {
    data: IProductImageLink[]
    total: number
    page: number
    limit: number
  }
  
  