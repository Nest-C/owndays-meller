import type { ProductItem } from '@/lib/types';

export interface ProductModalProps {
  item: ProductItem;
  skuIndex: number;
  onSelectSku: (index: number) => void;
  onClose: () => void;
}
