import {
    createSpreadPackage,
    deleteSpreadPackage,
    getAllSpreadPackages,
    getSpreadPackageById,
    updateSpreadPackage,
  } from "@/api/services/spread-package.service"
  import type { ICreateSpreadPackage, IUpdateSpreadPackage } from "@/interface/request/spread-package"
  import type { ISpreadPackageListResponse, ISpreadPackageResponse } from "@/interface/response/spread-package"
  import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult,
    useQueryClient,
  } from "@tanstack/react-query"
  
  // Query keys
  const SPREAD_PACKAGES_KEY = "spread-packages"
  const SPREAD_PACKAGE_KEY = "spread-package"
  
  // Get all spread packages
  export const useGetAllSpreadPackages = (): UseQueryResult<ISpreadPackageListResponse> => {
    return useQuery({
      queryKey: [SPREAD_PACKAGES_KEY],
      queryFn: () => getAllSpreadPackages(),
    })
  }
  
  // Get spread package by ID
  export const useGetSpreadPackageById = (id: string): UseQueryResult<ISpreadPackageResponse> => {
    return useQuery({
      queryKey: [SPREAD_PACKAGE_KEY, id],
      queryFn: () => getSpreadPackageById(id),
      enabled: !!id, // Only run the query if id is provided
    })
  }
  
  // Create spread package
  export const useCreateSpreadPackage = (): UseMutationResult<ISpreadPackageResponse, Error, ICreateSpreadPackage> => {
    const queryClient = useQueryClient()
  
    return useMutation<ISpreadPackageResponse, Error, ICreateSpreadPackage>({
      mutationFn: (payload: ICreateSpreadPackage) => createSpreadPackage(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [SPREAD_PACKAGES_KEY],
        })
      },
    })
  }
  
  // Update spread package
  export const useUpdateSpreadPackage = (): UseMutationResult<
    ISpreadPackageResponse,
    Error,
    { id: string; payload: IUpdateSpreadPackage }
  > => {
    const queryClient = useQueryClient()
  
    return useMutation<ISpreadPackageResponse, Error, { id: string; payload: IUpdateSpreadPackage }>({
      mutationFn: ({ id, payload }) => updateSpreadPackage(id, payload),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [SPREAD_PACKAGE_KEY, variables.id] })
        queryClient.invalidateQueries({
          queryKey: [SPREAD_PACKAGES_KEY],
        })
      },
    })
  }
  
  // Delete spread package
  export const useDeleteSpreadPackage = (): UseMutationResult<{ success: boolean }, Error, string> => {
    const queryClient = useQueryClient()
  
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: (id: string) => deleteSpreadPackage(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: [SPREAD_PACKAGE_KEY, id] })
        queryClient.invalidateQueries({
          queryKey: [SPREAD_PACKAGES_KEY],
        })
      },
    })
  }
  
  