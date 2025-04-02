import {
    createSellerPackage,
    deleteSellerPackage,
    getAllSellerPackages,
    getSellerPackageById,
    updateSellerPackage,
} from "@/api/services/seller-package.service"
import type { ICreateSellerPackage, IUpdateSellerPackage } from "@/interface/request/seller-package"
import type { ISellerPackageListResponse, ISellerPackageResponse } from "@/interface/response/seller-package"
import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult,
    useQueryClient,
} from "@tanstack/react-query"

// Query keys
const SELLER_PACKAGES_KEY = "seller-packages"
const SELLER_PACKAGE_KEY = "seller-package"

// Get all seller packages
export const useGetAllSellerPackages = (): UseQueryResult<ISellerPackageListResponse> => {
    return useQuery({
        queryKey: [SELLER_PACKAGES_KEY],
        queryFn: () => getAllSellerPackages(),
    })
}

// Get seller package by ID
export const useGetSellerPackageById = (id: string): UseQueryResult<ISellerPackageResponse> => {
    return useQuery({
        queryKey: [SELLER_PACKAGE_KEY, id],
        queryFn: () => getSellerPackageById(id),
        enabled: !!id, // Only run the query if id is provided
    })
}

// Create seller package
export const useCreateSellerPackage = (): UseMutationResult<ISellerPackageResponse, Error, ICreateSellerPackage> => {
    const queryClient = useQueryClient()

    return useMutation<ISellerPackageResponse, Error, ICreateSellerPackage>({
        mutationFn: (payload: ICreateSellerPackage) => createSellerPackage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: [SELLER_PACKAGES_KEY]
            })
        },
    })
}

// Update seller package
export const useUpdateSellerPackage = (): UseMutationResult<
    ISellerPackageResponse,
    Error,
    { id: string; payload: IUpdateSellerPackage }
> => {
    const queryClient = useQueryClient()

    return useMutation<ISellerPackageResponse, Error, { id: string; payload: IUpdateSellerPackage }>({
        mutationFn: ({ id, payload }) => updateSellerPackage(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [SELLER_PACKAGE_KEY, variables.id] })
            queryClient.invalidateQueries({ 
                queryKey: [SELLER_PACKAGES_KEY]
            })
        },
    })
}

// Delete seller package
export const useDeleteSellerPackage = (): UseMutationResult<{ success: boolean }, Error, string> => {
    const queryClient = useQueryClient()

    return useMutation<{ success: boolean }, Error, string>({
        mutationFn: (id: string) => deleteSellerPackage(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [SELLER_PACKAGE_KEY, id] })
            queryClient.invalidateQueries({ 
                queryKey: [SELLER_PACKAGES_KEY]
            })
        },
    })
}

