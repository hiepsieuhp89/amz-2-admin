export interface IProductImage {
    id: string
    url: string
    isMain: boolean
    sortOrder: number
}

export interface IProductVariantResponse {
    id: string
    sku: string
    price: number
    compareAtPrice?: number
    costPrice?: number
    quantity: number
    attributes: Record<string, string>
    isDefault: boolean
}

export interface IProductCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    name: string;
    description: string;
    parentId: string | null;
}

export interface IProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    name: string;
    description: string;
    imageUrl: string;
    salePrice: string;
    price: string;
    stock: number;
    category?: IProductCategory;
}

export interface IPaginationMeta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface IProductListData {
    data: IProduct[];
    meta: IPaginationMeta;
}

export interface IApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
    errors: null | any;
    timestamp: string;
}

export interface IProductListResponse extends IApiResponse<IProductListData> {}

export interface IProductResponse extends IApiResponse<IProduct> {}

