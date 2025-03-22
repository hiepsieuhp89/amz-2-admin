import {
    createImageInfo,
    deleteImage,
    deleteProductImageLink,
    getAllImages,
    getImageById,
    getProductImages,
    updateImageInfo,
    uploadImage,
  } from "@/api/services/image.service"
  import type { ICreateImageInfo, IUpdateImageInfo, IUploadImageParams } from "@/interface/request/image"
  import type {
    IImageListResponse,
    IImageResponse,
    IProductImageListResponse,
    IUploadImageResponse,
  } from "@/interface/response/image"
  import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult,
    useQueryClient,
  } from "@tanstack/react-query"
  
  // Query keys
  const IMAGES_KEY = "images"
  const IMAGE_KEY = "image"
  const PRODUCT_IMAGES_KEY = "product-images"
  
  // Upload image
  export const useUploadImage = (): UseMutationResult<IUploadImageResponse, Error, IUploadImageParams> => {
    const queryClient = useQueryClient()
  
    return useMutation<IUploadImageResponse, Error, IUploadImageParams>({
      mutationFn: (params: IUploadImageParams) => uploadImage(params),
      onSuccess: (result, variables) => {
        queryClient.invalidateQueries({ queryKey: [IMAGES_KEY] })
        if (variables.productId) {
          queryClient.invalidateQueries({
            queryKey: [PRODUCT_IMAGES_KEY, variables.productId],
          })
        }
      },
    })
  }
  
  // Create image info
  export const useCreateImageInfo = (): UseMutationResult<IImageResponse, Error, ICreateImageInfo> => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, ICreateImageInfo>({
      mutationFn: (payload: ICreateImageInfo) => createImageInfo(payload),
      onSuccess: (_, variables) => {
        // Invalidate images query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: [IMAGES_KEY] })
  
        // If productId is provided, also invalidate product images
        if (variables.productId) {
          queryClient.invalidateQueries({
            queryKey: [PRODUCT_IMAGES_KEY, variables.productId],
          })
        }
      },
    })
  }
  
  // Get all images
  export const useGetAllImages = (params?: {
    page?: number
    limit?: number
    tags?: string[]
  }): UseQueryResult<IImageListResponse> => {
    return useQuery({
      queryKey: [IMAGES_KEY, params],
      queryFn: () => getAllImages(params),
    })
  }
  
  // Get product images
  export const useGetProductImages = (
    productId: string,
    params?: { page?: number; limit?: number },
  ): UseQueryResult<IProductImageListResponse> => {
    return useQuery({
      queryKey: [PRODUCT_IMAGES_KEY, productId, params],
      queryFn: () => getProductImages(productId, params),
      enabled: !!productId, // Only run the query if productId is provided
    })
  }
  
  // Delete product image link
  export const useDeleteProductImageLink = (): UseMutationResult<
    { success: boolean },
    Error,
    { id: string; productId: string }
  > => {
    const queryClient = useQueryClient()
  
    return useMutation<{ success: boolean }, Error, { id: string; productId: string }>({
      mutationFn: ({ id }) => deleteProductImageLink(id),
      onSuccess: (_, variables) => {
        // Invalidate product images query to refetch the updated list
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_IMAGES_KEY, variables.productId],
        })
      },
    })
  }
  
  // Get image by ID
  export const useGetImageById = (id: string): UseQueryResult<IImageResponse> => {
    return useQuery({
      queryKey: [IMAGE_KEY, id],
      queryFn: () => getImageById(id),
      enabled: !!id, // Only run the query if id is provided
    })
  }
  
  // Update image info
  export const useUpdateImageInfo = (): UseMutationResult<
    IImageResponse,
    Error,
    { id: string; payload: IUpdateImageInfo; productId?: string }
  > => {
    const queryClient = useQueryClient()
  
    return useMutation<IImageResponse, Error, { id: string; payload: IUpdateImageInfo; productId?: string }>({
      mutationFn: ({ id, payload }) => updateImageInfo(id, payload),
      onSuccess: (_, variables) => {
        // Invalidate specific image query and images list
        queryClient.invalidateQueries({ queryKey: [IMAGE_KEY, variables.id] })
        queryClient.invalidateQueries({ queryKey: [IMAGES_KEY] })
  
        // If productId is provided, also invalidate product images
        if (variables.productId) {
          queryClient.invalidateQueries({
            queryKey: [PRODUCT_IMAGES_KEY, variables.productId],
          })
        }
      },
    })
  }
  
  // Delete image
  export const useDeleteImage = (): UseMutationResult<
    { success: boolean },
    Error,
    { id: string; productId?: string }
  > => {
    const queryClient = useQueryClient()
  
    return useMutation<{ success: boolean }, Error, { id: string; productId?: string }>({
      mutationFn: ({ id }) => deleteImage(id),
      onSuccess: (_, variables) => {
        // Invalidate images query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: [IMAGES_KEY] })
  
        // If productId is provided, also invalidate product images
        if (variables.productId) {
          queryClient.invalidateQueries({
            queryKey: [PRODUCT_IMAGES_KEY, variables.productId],
          })
        }
      },
    })
  }
  
  