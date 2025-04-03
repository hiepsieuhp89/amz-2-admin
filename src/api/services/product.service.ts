import type {
  ICreateProduct
} from "@/interface/request/product";
import type {
  IProductListResponse,
  IProductResponse,
} from "@/interface/response/product";
import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient";
import { ConfigProductEndPoint } from "./contants";

// Create a new product
export const createProduct = async (
  payload: ICreateProduct
): Promise<IProductResponse> => {
  const res = await sendPost(ConfigProductEndPoint.BASE, payload);
  return res;
};

// Get all products
export const getAllProducts = async (params?: {
  page?: number;
  take?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  sellerId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<IProductListResponse> => {
  const res = await sendGet(ConfigProductEndPoint.BASE, {
    page: params?.page,
    take: params?.take,
    search: params?.search && params?.search.length > 0 ? params?.search : undefined,
    categoryId: params?.categoryId && params?.categoryId.length > 0 ? params?.categoryId : undefined,
    brandId: params?.brandId && params?.brandId.length > 0 ? params?.brandId : undefined,
    sellerId: params?.sellerId && params?.sellerId.length > 0 ? params?.sellerId : undefined,
    isActive: params?.isActive && params?.isActive.toString().length > 0 ? params?.isActive.toString() : undefined,
    isFeatured: params?.isFeatured && params?.isFeatured.toString().length > 0 ? params?.isFeatured.toString() : undefined,
    minPrice: params?.minPrice && params?.minPrice.toString().length > 0 ? params?.minPrice.toString() : undefined,
    maxPrice: params?.maxPrice && params?.maxPrice.toString().length > 0 ? params?.maxPrice.toString() : undefined,
    sortBy: params?.sortBy && params?.sortBy.length > 0 ? params?.sortBy : undefined,
    sortOrder: params?.sortOrder && params?.sortOrder.length > 0 ? params?.sortOrder : undefined,
  });
  return res;
};

// Get product by ID
export const getProductById = async (id: string): Promise<IProductResponse> => {
  const res = await sendGet(ConfigProductEndPoint.GET_BY_ID(id));
  return res;
};

// Update product
export const updateProduct = async (
  id: string,
  payload: {
    name?: string;
    description?: string;
    imageUrls?: string[];
    categoryId?: string;
    salePrice?: number | string;
    price?: number | string;
    stock?: number;
  }
): Promise<IProductResponse> => {
  const res = await sendPatch(ConfigProductEndPoint.UPDATE(id), payload);
  return res;
};

// Delete product
export const deleteProduct = async (
  id: string
): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigProductEndPoint.DELETE(id));
  return res;
};
