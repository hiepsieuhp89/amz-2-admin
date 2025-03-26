import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCity, deleteCity, getCities, getCityById, updateCity } from "@/api/services/cities.service"
import { IAddCityRequest, IGetCitiesRequest, IUpdateCityRequest } from "@/interface/request/cities"
import { ICityResponse, ICitiesResponse } from "@/interface/response/cities"

export const useAddCity = () => {
  const queryClient = useQueryClient()
  return useMutation<ICityResponse, Error, IAddCityRequest>({
    mutationFn: addCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
}

export const useGetCities = (params?: IGetCitiesRequest) => {
  return useQuery<ICitiesResponse, Error>({
    queryKey: ['cities', params],
    queryFn: () => getCities(params)
  })
}

export const useGetCityById = (id: string) => {
  return useQuery<ICityResponse, Error>({
    queryKey: ['city', id],
    queryFn: () => getCityById(id),
    enabled: !!id
  })
}

export const useUpdateCity = () => {
  const queryClient = useQueryClient()
  return useMutation<ICityResponse, Error, { id: string; payload: IUpdateCityRequest }>({
    mutationFn: ({ id, payload }) => updateCity(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
}

export const useDeleteCity = () => {
  const queryClient = useQueryClient()
  return useMutation<ICityResponse, Error, string>({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
} 