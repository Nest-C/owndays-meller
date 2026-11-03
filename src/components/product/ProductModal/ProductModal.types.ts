import type { ProductItem } from '@/types/product';

export interface ProductModalProps {
  item: ProductItem;
  skuIndex: number;
  onSelectSku: (index: number) => void;
  onClose: () => void;
}
