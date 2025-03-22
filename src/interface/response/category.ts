export interface ICategory {
    id: string
    name: string
    description?: string
    parentId: string | null
    children: ICategory[]
    parent?: ICategory
    createdAt: string
    updatedAt: string
    deletedAt: null | string
}

export interface IPaginationMeta {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export interface ICategoryList {
    data: ICategory[]
    meta: IPaginationMeta
}

export interface IApiResponse<T> {
    status: boolean
    message: string
    data: T
    errors: null | any
    timestamp: string
}

export interface ICategoryListResponse extends IApiResponse<ICategoryList> {}

export interface ICategoryResponse extends IApiResponse<ICategory> {}