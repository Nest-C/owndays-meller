import type { ProductItem } from '@/lib/types';

export interface ProductsResponse {
  success: boolean;
  message: string;
  total: number;
  not_found: string[];
  data: ProductItem[];
}
