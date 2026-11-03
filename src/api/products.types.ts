import type { ProductItem } from '@/types/product';

export interface ProductsResponse {
  success: boolean;
  message: string;
  total: number;
  not_found: string[];
  data: ProductItem[];
}
