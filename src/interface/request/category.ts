export interface ICategory {
    id: string
    name: string
    description?: string
    parentId: string | null
    children: ICategory[]
    parent?: ICategory
    imageUrl?: string
    createdAt: string
    updatedAt: string
    deletedAt: null | string
    
}

export interface ICreateCategory {
    id: string
    name: string
    description?: string
    parentId: string
    imageUrl?: string
}

// Pagination metadata
export interface IPaginationMeta {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

// Paginated category list
export interface ICategoryList {
    data: ICategory[]
    meta: IPaginationMeta
}

// Generic API response wrapper
export interface IApiResponse<T> {
    status: boolean
    message: string
    data: T
    errors: null | any
    timestamp: string
}

// Category list response
export interface ICategoryListResponse extends IApiResponse<ICategoryList> {}

// Single category response
export interface ICategoryResponse extends IApiResponse<ICategory> {}