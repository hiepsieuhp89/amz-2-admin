import { sendDelete, sendGet, sendPost } from "../apiClient";
import { ConfigProductReviewEndPoint } from "./contants";

// Interface for product review payload
export interface ICreateProductReview {
  productId: string;
  userId: string;
  rating: number;
  content: string;
  images?: string[];
}

// Create a new product review
export const createProductReview = async (payload: ICreateProductReview): Promise<any> => {
  const res = await sendPost(ConfigProductReviewEndPoint.BASE, payload);
  return res;
};

// Get all product reviews with pagination
export const getAllProductReviews = async (params?: {
  page?: number;
  take?: number;
  search?: string;
  productId?: string;
  userId?: string;
  rating?: number;
}): Promise<any> => {
  const res = await sendGet(ConfigProductReviewEndPoint.BASE, {
    page: params?.page,
    take: params?.take,
    search: params?.search && params?.search.length > 0 ? params?.search : undefined,
    productId: params?.productId && params?.productId.length > 0 ? params?.productId : undefined,
    userId: params?.userId && params?.userId.length > 0 ? params?.userId : undefined,
    rating: params?.rating
  });
  return res;
};

// Get product review by ID
export const getProductReviewById = async (id: string): Promise<any> => {
  const res = await sendGet(ConfigProductReviewEndPoint.GET_BY_ID(id));
  return res;
};

// Delete product review
export const deleteProductReview = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigProductReviewEndPoint.DELETE(id));
  return res;
}; 