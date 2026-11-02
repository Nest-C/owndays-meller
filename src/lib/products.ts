import type { ProductItem, ProductsResponse } from './types';

const PRODUCTS_URL =
  process.env.PRODUCTS_URL ?? 'https://api-one-alpha-60.vercel.app/meller/products.json';

const REVALIDATE_SECONDS = 3600;

/**
 * Server-only data fetch. Throws on failure on purpose: at build time the
 * build fails loudly, and during revalidation Next.js keeps serving the
 * last good page instead of caching an empty one.
 */
export async function getProducts(): Promise<ProductItem[]> {
  const res = await fetch(PRODUCTS_URL, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);

  const json = (await res.json()) as ProductsResponse;
  if (!json.success) throw new Error(json.message || 'Failed to load products');
  return json.data;
}
