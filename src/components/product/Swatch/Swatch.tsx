'use client';

import type { CSSProperties } from 'react';
import { skuColorLabel, skuSwatchBackground } from '@/lib/product';
import styles from './Swatch.module.css';
import type { SwatchProps } from './Swatch.types';

export function Swatch({ sku, selected, onSelect }: SwatchProps) {
  return (
    <button
      type="button"
      className={styles.swatch}
      aria-label={`${sku.code} ${skuColorLabel(sku)}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.dot} style={{ '--swatch-bg': skuSwatchBackground(sku) } as CSSProperties} />
    </button>
  );
}
