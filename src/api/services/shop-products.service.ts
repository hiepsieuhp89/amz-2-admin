import { sendPost, sendDelete, sendGet } from "@/api/apiClient";
import { IAddShopProductsRequest, IShopSearchParams, IRemoveShopProductsRequest, IGetAllShopsRequest, IGetShopProductsRequest } from "@/interface/request/shop-products";
import { IShopProductsResponse, IAllShopsResponse, IShopsListResponse } from "@/interface/response/shop-products";
import { ConfigShopProductEndPoint } from "@/api/services/contants";

export const getAllShops = async (params?: IShopSearchParams): Promise<IShopsListResponse> => {
    const res = await sendGet('/products/shop', params);
    const data: IShopsListResponse = res;
    return data;
};

export const getProducts = async (params?: IShopSearchParams): Promise<IShopsListResponse> => {
    const res = await sendGet('/products', params);
    const data: IShopsListResponse = res;
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

export const getShopProducts = async (
    params?: IGetAllShopsRequest
): Promise<IAllShopsResponse> => {
    const res = await sendGet(ConfigShopProductEndPoint.BASE, params)
    const data: IAllShopsResponse = res
    return data
}

export const getAllShopProducts = async (
    params?: IGetShopProductsRequest
): Promise<IShopProductsResponse> => {
    const res = await sendGet(ConfigShopProductEndPoint.BASE, params)
    const data: IShopProductsResponse = res
    return data
}

