import { addShopProducts, removeShopProducts } from "@/api/services/shop-products.service"
import type { IAddShopProductsRequest, IRemoveShopProductsRequest } from "@/interface/request/shop-products"
import type { IShopProductsResponse } from "@/interface/response/shop-products"
import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"

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

