import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "@/api/services/product.service"
import type { ICreateProduct, IUpdateProduct } from "@/interface/request/product"
import type { IProductListResponse, IProductResponse } from "@/interface/response/product"
import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult,
    useQueryClient,
} from "@tanstack/react-query"

// Query keys
const PRODUCTS_KEY = "products"
const PRODUCT_KEY = "product"

// Get all products
export const useGetAllProducts = (params?: {
    page?: number
    take?: number
    search?: string
    order?: string
    isNew?: string
    isHot?: string
    isFeature?: string
    categoryId?: string
}): UseQueryResult<any> => {
    return useQuery({
        queryKey: [PRODUCTS_KEY, params],
        queryFn: () => getAllProducts(params),
    })
}

// Get product by ID
export const useGetProductById = (id: string): UseQueryResult<IProductResponse> => {
    return useQuery({
        queryKey: [PRODUCT_KEY, id],
        queryFn: () => getProductById(id),
        enabled: !!id, // Only run the query if id is provided
    })
}

// Create product
export const useCreateProduct = (): UseMutationResult<
    IProductResponse, 
    Error, 
    ICreateProduct
> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createProduct(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [PRODUCTS_KEY],
            })
        },
    })
}

// Update product
export const useUpdateProduct = (): UseMutationResult<
    IProductResponse,
    Error,
    { 
        id: string; 
        payload: {
            name?: string;
            description?: string;
            imageUrls?: string[];
            categoryId?: string;
            salePrice?: number | string;
            price?: number | string;
            stock?: number;
            isHot?: boolean;
        }
    }
> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }) => updateProduct(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY, variables.id] })
            queryClient.invalidateQueries({
                queryKey: [PRODUCTS_KEY],
            })
        },
    })
}

// Delete product
export const useDeleteProduct = (): UseMutationResult<{ success: boolean }, Error, string> => {
    const queryClient = useQueryClient()

    return useMutation<{ success: boolean }, Error, string>({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY, id] })
            queryClient.invalidateQueries({
                queryKey: [PRODUCTS_KEY],
            })
        },
    })
}

