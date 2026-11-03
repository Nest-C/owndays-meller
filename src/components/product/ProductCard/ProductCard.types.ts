import type { ProductItem } from '@/types/product';

export interface ProductCardProps {
  item: ProductItem;
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
