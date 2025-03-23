import { sendPost, sendDelete, sendGet } from "@/api/apiClient";
import { IAddShopProductsRequest, IProductSearchParams, IRemoveShopProductsRequest } from "@/interface/request/shop-products";
import { IProductsListResponse, IShopProductsResponse } from "@/interface/response/shop-products";

export const getShopProducts = async (params?: IProductSearchParams): Promise<IProductsListResponse> => {
    const res = await sendGet('/products/shop', params);
    const data: IProductsListResponse = res;
    return data;
};

export const getProducts = async (params?: IProductSearchParams): Promise<IProductsListResponse> => {
    const res = await sendGet('/products', params);
    const data: IProductsListResponse = res;
    return data;
};

export const addShopProducts = async (payload: IAddShopProductsRequest): Promise<IShopProductsResponse> => {
    const res = await sendPost("/shop-products/add", payload)
    const data: IShopProductsResponse = res
    return data
}

export const removeShopProducts = async (payload: IRemoveShopProductsRequest): Promise<IShopProductsResponse> => {
    const res = await sendDelete("/shop-products/remove", payload)
    const data: IShopProductsResponse = res
    return data
}

