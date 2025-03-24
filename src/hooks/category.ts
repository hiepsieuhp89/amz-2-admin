import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryDescendants,
    updateCategory,
  } from "@/api/services/category.service"
import { ICategory, ICreateCategory } from "@/interface/request/category"
  import type { ICategoryListResponse, ICategoryResponse } from "@/interface/response/category"
  import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult,
    useQueryClient,
  } from "@tanstack/react-query"
  
  // Query keys
  const CATEGORIES_KEY = "categories"
  const CATEGORY_KEY = "category"
  const CATEGORY_DESCENDANTS_KEY = "category-descendants"
  
  // Get all categories
  export const useGetAllCategories = (params?: {
    page?: number
    take?: number
    search?: string
    role?: string
    status?: string
    sortBy?: string
    order?: "ASC" | "DESC"
  }): UseQueryResult<ICategoryListResponse> => {
    return useQuery({
      queryKey: [CATEGORIES_KEY, params],
      queryFn: () => getAllCategories(params),
    })
  }

  // Get category by ID
  export const useGetCategoryById = (id: string): UseQueryResult<ICategoryResponse> => {
    return useQuery({
      queryKey: [CATEGORY_KEY, id],
      queryFn: () => getCategoryById(id),
      enabled: !!id, // Only run the query if id is provided
    })
  }
  
  // Get category descendants
  export const useGetCategoryDescendants = (id: string): UseQueryResult<ICategoryListResponse> => {
    return useQuery({
      queryKey: [CATEGORY_DESCENDANTS_KEY, id],
      queryFn: () => getCategoryDescendants(id),
      enabled: !!id,
    })
  }
  
  // Create category
  export const useCreateCategory = (): UseMutationResult<ICategoryResponse, Error, ICreateCategory> => {
    const queryClient = useQueryClient()
  
    return useMutation<ICategoryResponse, Error, ICreateCategory>({
      mutationFn: (payload: ICreateCategory) => createCategory(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
      },
    })
  }
  
  // Update category
  export const useUpdateCategory = (): UseMutationResult<
    ICategoryResponse,
    Error,
    { id: string; payload: ICreateCategory }
  > => {
    const queryClient = useQueryClient()
  
    return useMutation<ICategoryResponse, Error, { id: string; payload: ICreateCategory }>({
      mutationFn: ({ id, payload }) => updateCategory(id, payload),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [CATEGORY_KEY, variables.id] })
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
        queryClient.invalidateQueries({ queryKey: [CATEGORY_DESCENDANTS_KEY, variables.id] })
      },
    })
  }
  
  // Delete category
  export const useDeleteCategory = (): UseMutationResult<{ success: boolean }, Error, string> => {
    const queryClient = useQueryClient()
    return useMutation<{ success: boolean }, Error, string>({
      mutationFn: (id: string) => deleteCategory(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] })
      },
    })
  }
  
  