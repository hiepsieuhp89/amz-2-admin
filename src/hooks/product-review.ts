import {
  createProductReview,
  deleteProductReview,
  getAllProductReviews,
  getProductReviewById,
  ICreateProductReview
} from "@/api/services/product-review.service";
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

// Query keys
const PRODUCT_REVIEWS_KEY = "product-reviews";
const PRODUCT_REVIEW_KEY = "product-review";

// Get all product reviews
export const useGetAllProductReviews = (params?: {
  page?: number;
  take?: number;
  search?: string;
  productId?: string;
  userId?: string;
  rating?: number;
}): UseQueryResult<any> => {
  return useQuery({
    queryKey: [PRODUCT_REVIEWS_KEY, params],
    queryFn: () => getAllProductReviews(params),
  });
};

// Get product review by ID
export const useGetProductReviewById = (id: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: [PRODUCT_REVIEW_KEY, id],
    queryFn: () => getProductReviewById(id),
    enabled: !!id, // Only run the query if id is provided
  });
};

// Create product review
export const useCreateProductReview = (): UseMutationResult<any, Error, ICreateProductReview> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateProductReview) => createProductReview(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_REVIEWS_KEY],
      });
      // Also invalidate product queries as reviews might affect product data
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

// Delete product review
export const useDeleteProductReview = (): UseMutationResult<
  { success: boolean },
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (id: string) => deleteProductReview(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_REVIEW_KEY, id] });
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_REVIEWS_KEY],
      });
      // Also invalidate product queries as deleting a review might affect product data
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}; 