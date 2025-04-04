export interface IProductVariant {
  sku?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  quantity: number;
  attributes?: Record<string, string>;
  isDefault?: boolean;
}

export interface ICreateProduct {
    name: string;
    description: string;
    imageUrls?: string[];
    categoryId?: string;
    salePrice: number | string;
    price: number | string;
    stock: number;
    isHot?: boolean;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  shortDescription?: string;
  slug?: string;
  sku?: string;
  barcode?: string;
  price?: number | string;
  salePrice?: number | string;
  stock?: number | string;
  categoryId?: string;
  brandId?: string;
  tags?: string[];
  attributes?: Record<string, string | string[]>;
  specifications?: Record<string, string>;
  isActive?: boolean;
  isFeatured?: boolean;
  isDigital?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  variants?: IProductVariant[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  sellerId?: string;
  imageUrls?: string[];
  isHot?: boolean;
}
