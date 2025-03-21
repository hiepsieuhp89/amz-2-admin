export interface ICreateCategory {
    name: string
    description?: string
    parentId?: string
    isActive?: boolean
    order?: number
}