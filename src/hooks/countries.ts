import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCountry, deleteCountry, getCountries, getCountryById, updateCountry } from "@/api/services/countries.service"
import { IAddCountryRequest, IGetCountriesRequest, IUpdateCountryRequest } from "@/interface/request/countries"
import { ICountryResponse, ICountriesResponse } from "@/interface/response/countries"

export const useAddCountry = () => {
  const queryClient = useQueryClient()
  return useMutation<ICountryResponse, Error, IAddCountryRequest>({
    mutationFn: addCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}

export const useGetCountries = (params?: IGetCountriesRequest) => {
  return useQuery<ICountriesResponse, Error>({
    queryKey: ['countries', params],
    queryFn: () => getCountries(params)
  })
}

export const useGetCountryById = (id: string) => {
  return useQuery<ICountryResponse, Error>({
    queryKey: ['country', id],
    queryFn: () => getCountryById(id),
    enabled: !!id
  })
}

export const useUpdateCountry = () => {
  const queryClient = useQueryClient()
  return useMutation<ICountryResponse, Error, { id: string; payload: IUpdateCountryRequest }>({
    mutationFn: ({ id, payload }) => updateCountry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}

export const useDeleteCountry = () => {
  const queryClient = useQueryClient()
  return useMutation<ICountryResponse, Error, string>({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
} 