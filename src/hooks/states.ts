import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addState, deleteState, getStates, getStateById, updateState } from "@/api/services/states.service"
import { IAddStateRequest, IGetStatesRequest, IUpdateStateRequest } from "@/interface/request/states"
import { IStateResponse, IStatesResponse } from "@/interface/response/states"

export const useAddState = () => {
  const queryClient = useQueryClient()
  return useMutation<IStateResponse, Error, IAddStateRequest>({
    mutationFn: addState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] })
    }
  })
}

export const useGetStates = (params?: IGetStatesRequest) => {
  return useQuery<IStatesResponse, Error>({
    queryKey: ['states', params],
    queryFn: () => getStates(params)
  })
}

export const useGetStateById = (id: string) => {
  return useQuery<IStateResponse, Error>({
    queryKey: ['state', id],
    queryFn: () => getStateById(id),
    enabled: !!id
  })
}

export const useUpdateState = () => {
  const queryClient = useQueryClient()
  return useMutation<IStateResponse, Error, { id: string; payload: IUpdateStateRequest }>({
    mutationFn: ({ id, payload }) => updateState(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] })
    }
  })
}

export const useDeleteState = () => {
  const queryClient = useQueryClient()
  return useMutation<IStateResponse, Error, string>({
    mutationFn: deleteState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] })
    }
  })
} 