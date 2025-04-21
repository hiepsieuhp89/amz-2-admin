import { addShopProducts, getAllShopProducts, getAllShops, removeShopProducts } from "@/api/services/shop-products.service"
import type { IAddShopProductsRequest, IGetAllShopsRequest, IGetShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type {IAllShopsResponse, IShopProductsResponse } from "@/interface/response/shop-products"
import { type UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Query keys
const SHOP_PRODUCTS_KEY = "shop-products"
const SHOP_PRODUCT_KEY = "shop-product"

export const useAddShopProducts = (): UseMutationResult<IShopProductsResponse, Error, IAddShopProductsRequest> => {
  const queryClient = useQueryClient()

  return useMutation<IShopProductsResponse, Error, IAddShopProductsRequest>({
    mutationFn: (params: IAddShopProductsRequest) => addShopProducts(params),
    onSuccess: (result: IShopProductsResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["shopProducts"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useRemoveShopProducts = (): UseMutationResult<
  IShopProductsResponse,
  Error,
  IRemoveShopProductsRequest
> => {
  const queryClient = useQueryClient()

  return useMutation<IShopProductsResponse, Error, IRemoveShopProductsRequest>({
    mutationFn: (params: IRemoveShopProductsRequest) => removeShopProducts(params),
    onSuccess: (result: IShopProductsResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["shopProducts"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

// Get all products
export const useGetAllShops = (params?: IGetAllShopsRequest) => {
  return useQuery<IAllShopsResponse, Error>({
      queryKey: ['shop-products', params],
      queryFn: () => getAllShops(params),
  })
}

// Get all shop products
export const useGetAllShopProducts = (params?: IGetShopProductsRequest) => {
  return useQuery<IShopProductsResponse, Error>({
    queryKey: [SHOP_PRODUCTS_KEY, params],
    queryFn: () => getAllShopProducts(params),
  })
}

// Get shop product by ID
export const useGetShopProductById = (id: string, options?: { enabled?: boolean }): UseQueryResult<any> => {
  return useQuery({
    queryKey: [SHOP_PRODUCT_KEY, id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/shop-products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shop product');
      }
      return response.json();
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
  });
}

