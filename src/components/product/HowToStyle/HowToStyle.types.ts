import type { StaticImageData } from 'next/image';
import type { ProductItem } from '@/types/product';

export interface HowToStyleProps {
  products: ProductItem[];
  onOpen: (item: ProductItem, skuIndex: number) => void;
}

export interface StyleItem {
  productCode: string;
  skuCode: string;
  image?: StaticImageData; // static import from src/assets/images/style/
}
