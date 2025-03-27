import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addPostalCode, deletePostalCode, getPostalCodes, getPostalCodeById, updatePostalCode } from "@/api/services/postal-codes.service"
import { IAddPostalCodeRequest, IGetPostalCodesRequest, IUpdatePostalCodeRequest } from "@/interface/request/postal-codes"
import { IPostalCodeResponse, IPostalCodesResponse } from "@/interface/response/postal-codes"

export const useAddPostalCode = () => {
  const queryClient = useQueryClient()
  return useMutation<IPostalCodeResponse, Error, IAddPostalCodeRequest>({
    mutationFn: addPostalCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postal-codes'] })
    }
  })
}

export const useGetPostalCodes = (params?: IGetPostalCodesRequest) => {
  return useQuery<IPostalCodesResponse, Error>({
    queryKey: ['postal-codes', params],
    queryFn: () => getPostalCodes(params)
  })
}

export const useGetPostalCodeById = (id: string) => {
  return useQuery<IPostalCodeResponse, Error>({
    queryKey: ['postal-code', id],
    queryFn: () => getPostalCodeById(id),
    enabled: !!id
  })
}

export const useUpdatePostalCode = () => {
  const queryClient = useQueryClient()
  return useMutation<IPostalCodeResponse, Error, { id: string; payload: IUpdatePostalCodeRequest }>({
    mutationFn: ({ id, payload }) => updatePostalCode(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postal-codes'] })
    }
  })
}

export const useDeletePostalCode = () => {
  const queryClient = useQueryClient()
  return useMutation<IPostalCodeResponse, Error, string>({
    mutationFn: deletePostalCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postal-codes'] })
    }
  })
} 