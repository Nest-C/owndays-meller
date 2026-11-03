import type { ProductItem } from '@/lib/types';

export interface HowToStyleProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex?: number) => void;
}

export interface StyleItem {
  productCode: string;
  skuCode: string;
  image?: string;
}
