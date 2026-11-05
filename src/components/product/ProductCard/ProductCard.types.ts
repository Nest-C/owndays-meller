import type { ProductItem } from '@/types/product';

export interface ProductCardProps {
  item: ProductItem;
  /** Selected color; owned by ProductCatalog so a color picked in the modal shows here too */
  skuIndex: number;
  onSelectSku: (productId: number, skuIndex: number) => void;
  onOpen: (item: ProductItem, skuIndex: number) => void;
}
