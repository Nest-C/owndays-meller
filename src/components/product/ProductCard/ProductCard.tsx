'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import type { ProductItem } from '@/lib/types';
import { defaultSkuIndex, formatYen, productNumber, skuThumbnail } from '@/lib/format';
import { Swatch } from '@/components/product/Swatch/Swatch';
import styles from './ProductCard.module.css';

const MAX_SWATCHES = 4;

interface ProductCardProps {
  item: ProductItem;
  /** Opens the detail panel with the card's currently selected color */
  onOpen: (item: ProductItem, skuIndex: number) => void;
}

export const ProductCard = memo(function ProductCard({ item, onOpen }: ProductCardProps) {
  const [skuIndex, setSkuIndex] = useState(() => defaultSkuIndex(item));
  const sku = item.skus[skuIndex] ?? item.skus[0];
  const thumbnail = skuThumbnail(sku);
  const visibleSkus = item.skus.slice(0, MAX_SWATCHES);
  const hiddenCount = item.skus.length - visibleSkus.length;

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={`${item.product.model_name} ${sku.code}`}
            width={388}
            height={298}
            sizes="(min-width: 1024px) 386px, calc(100vw - 68px)"
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.info}>
        <div>
          <h2 className={styles.name}>
            {/* Stretched button: the whole card opens the modal, swatches stay separate buttons */}
            <button type="button" className={styles.open} onClick={() => onOpen(item, skuIndex)}>
              {item.product.model_name}
            </button>
          </h2>
          <p className={styles.code}>{productNumber(item, sku)}</p>
        </div>

        <div className={styles.side}>
          <div className={styles.swatches} role="group" aria-label={`${item.product.model_name} のカラー`}>
            {visibleSkus.map((s, i) => (
              <Swatch key={s.id} sku={s} selected={i === skuIndex} onSelect={() => setSkuIndex(i)} />
            ))}
            {hiddenCount > 0 && <span className={styles.more}>+{hiddenCount}</span>}
          </div>
          <p className={styles.price}>
            {formatYen(item.selling_setting.price)}
            <small>+tax</small>
          </p>
        </div>
      </div>
    </article>
  );
});
