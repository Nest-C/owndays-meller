import { memo } from 'react';
import { skuColorLabel, skuSwatchBackground } from '@/lib/format';
import styles from './Swatch.module.css';
import type { SwatchProps } from './Swatch.types';

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
