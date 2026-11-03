import type { Sku } from '@/types/product';

export interface SwatchProps {
  sku: Sku;
  selected: boolean;
  onSelect: () => void;
}
