import type { Sku } from '@/lib/types';

export interface SwatchProps {
  sku: Sku;
  selected: boolean;
  onSelect: () => void;
}
