import type { ProductItem } from '@/lib/types';

export interface ProductCardProps {
  item: ProductItem;
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
