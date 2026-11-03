import type { ProductItem } from '@/types/product';

export interface HowToStyleProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex?: number) => void;
}

export interface StyleItem {
  productCode: string;
  skuCode: string;
  image?: string;
}
