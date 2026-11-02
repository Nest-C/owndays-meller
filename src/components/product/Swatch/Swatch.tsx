import { memo } from 'react';
import type { Sku } from '@/lib/types';
import { skuColorLabel, skuSwatchBackground } from '@/lib/format';
import styles from './Swatch.module.css';

interface SwatchProps {
  sku: Sku;
  selected: boolean;
  onSelect: () => void;
}

export const Swatch = memo(function Swatch({ sku, selected, onSelect }: SwatchProps) {
  return (
    <button
      type="button"
      className={styles.swatch}
      aria-label={`${sku.code} ${skuColorLabel(sku)}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.dot} style={{ background: skuSwatchBackground(sku) }} />
    </button>
  );
});
