export interface ICategory {
    id: string
    name: string
    description?: string
    parentId?: string
    isActive: boolean
    order?: number
    createdAt: string
    updatedAt: string
    parent?: ICategory
    image?: string
}

export interface ICategoryListResponse {
    data: ICategory[]
    total: number
    page: number
    limit: number
}

export interface ICategoryResponse {
    data: ICategory
}

