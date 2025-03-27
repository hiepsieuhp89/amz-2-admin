import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addDistrict, deleteDistrict, getDistricts, getDistrictById, updateDistrict } from "@/api/services/districts.service"
import { IAddDistrictRequest, IGetDistrictsRequest, IUpdateDistrictRequest } from "@/interface/request/districts"
import { IDistrictResponse, IDistrictsResponse } from "@/interface/response/districts"

export const useAddDistrict = () => {
  const queryClient = useQueryClient()
  return useMutation<IDistrictResponse, Error, IAddDistrictRequest>({
    mutationFn: addDistrict,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] })
    }
  })
}

export const useGetDistricts = (params?: IGetDistrictsRequest) => {
  return useQuery<IDistrictsResponse, Error>({
    queryKey: ['districts', params],
    queryFn: () => getDistricts(params)
  })
}

export const useGetDistrictById = (id: string) => {
  return useQuery<IDistrictResponse, Error>({
    queryKey: ['district', id],
    queryFn: () => getDistrictById(id),
    enabled: !!id
  })
}

export const useUpdateDistrict = () => {
  const queryClient = useQueryClient()
  return useMutation<IDistrictResponse, Error, { id: string; payload: IUpdateDistrictRequest }>({
    mutationFn: ({ id, payload }) => updateDistrict(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] })
    }
  })
}

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient()
  return useMutation<IDistrictResponse, Error, string>({
    mutationFn: deleteDistrict,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] })
    }
  })
} 