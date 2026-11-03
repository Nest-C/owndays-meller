import type { ProductItem } from '@/types/product';

export interface ProductGridProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
