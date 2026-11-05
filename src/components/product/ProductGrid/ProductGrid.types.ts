import type { ProductItem } from '@/types/product';

export interface ProductGridProps {
  products: ProductItem[];
  /** Product id → SKU index shown on that card; missing = the default SKU */
  cardSkus: Record<number, number>;
  onSelectSku: (productId: number, skuIndex: number) => void;
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
