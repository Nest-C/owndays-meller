'use client';

import { memo } from 'react';
import Image from 'next/image';
import { formatYen, productNumber, skuThumbnail } from '@/lib/product';
import { Swatch } from '@/components/product/Swatch/Swatch';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from './ProductCard.types';
import { MAX_SWATCHES } from './ProductCard.constants';

export const ProductCard = memo(function ProductCard({ item, skuIndex, onSelectSku, onOpen }: ProductCardProps) {
  const sku = item.skus[skuIndex] ?? item.skus[0];
  const name = item.product.model_name;
  const thumbnail = skuThumbnail(sku);
  const visibleSkus = item.skus.slice(0, MAX_SWATCHES);
  const hiddenCount = item.skus.length - visibleSkus.length;

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={`${name} ${sku.code}`}
            fill
            sizes="(min-width: 1024px) 386px, calc(100vw - 67px)"
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.info}>
        <div>
          <h2 className={styles.name}>
            {/* Stretched over the whole card; the swatches sit above it */}
            <button type="button" className={styles.open} onClick={() => onOpen(item, skuIndex)}>
              {name}
            </button>
          </h2>
          <p className={styles.code}>{productNumber(item, sku)}</p>
        </div>

        <div className={styles.side}>
          <div className={styles.swatches} role="group" aria-label={`${name} のカラー`}>
            {visibleSkus.map((s, i) => (
              <Swatch key={s.id} sku={s} selected={i === skuIndex} onSelect={() => onSelectSku(item.product.id, i)} />
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
