import type { ProductItem } from '@/lib/types';

export interface ProductGridProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
