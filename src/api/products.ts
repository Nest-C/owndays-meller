import type { ProductItem, ProductsResponse } from '@/lib/types';
import { apiGet } from './client';
import { ENDPOINTS } from './endpoints';

export async function getProducts(): Promise<ProductItem[]> {
  const json = await apiGet<ProductsResponse>(ENDPOINTS.products);
  if (!json.success) throw new Error(json.message || 'Failed to load products');
  return json.data;
}
