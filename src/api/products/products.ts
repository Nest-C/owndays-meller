import { apiGet } from '@/api/client';
import type { ProductItem } from '@/types/product';
import type { ProductsResponse } from './products.types';
import { PRODUCTS_PATH } from './products.constants';

export async function getProducts(): Promise<ProductItem[]> {
  const json = await apiGet<ProductsResponse>(PRODUCTS_PATH);
  if (!json.success) throw new Error(json.message || 'Failed to load products');
  return json.data;
}
