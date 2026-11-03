'use client';

import { useCallback, useRef, useState, type AnimationEvent } from 'react';
import {
  formatYen,
  frameTypeLabel,
  isOutOfStock,
  onlineStoreUrl,
  productNumber,
  skuColorLabel,
  sortedImages,
} from '@/lib/product';
import { EXTERNAL_LINK } from '@/constants/site';
import { useEscape } from '@/hooks/useEscape';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { CrossIcon } from '@/assets/icons';
import { ImageCarousel } from './ImageCarousel';
import styles from './ProductModal.module.css';
import type { ProductModalProps } from './ProductModal.types';

/** Mounted only while a product is selected; plays its own exit animation */
export function ProductModal({ item, skuIndex, onSelectSku, onClose }: ProductModalProps) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const sku = item.skus[skuIndex] ?? item.skus[0];
  const name = item.product.model_name;
  const outOfStock = isOutOfStock(item);
  const titleId = `product-modal-title-${item.product.id}`;

  const requestClose = useCallback(() => setClosing(true), []);

  // Unmount once the panel's slide-out ends, so the timing lives only in the CSS
  const onPanelAnimationEnd = (e: AnimationEvent) => {
    if (closing && e.target === e.currentTarget) onClose();
  };

  useScrollLock(true);
  useEscape(true, requestClose);
  const trapFocus = useFocusTrap(panelRef, true);

  return (
    <div className={styles.root} data-state={closing ? 'closing' : 'open'} onKeyDown={trapFocus}>
      <div className={styles.backdrop} onClick={requestClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className={styles.panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onAnimationEnd={onPanelAnimationEnd}
      >
        <div className={styles.top}>
          <div className={styles.topBar}>
            <h2 id={titleId} className={styles.title}>
              {name}
            </h2>
            <button type="button" className={styles.close} aria-label="閉じる" onClick={requestClose}>
              <CrossIcon width={42} height={42} />
            </button>
          </div>

          <ImageCarousel key={sku.id /* reset scroll on color change */} images={sortedImages(sku)} alt={`${name} ${sku.code}`} />

          <div className={styles.chips} role="group" aria-label="カラー">
            {item.skus.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={i === skuIndex}
                className={styles.chip}
                onClick={() => onSelectSku(i)}
              >
                {skuColorLabel(s)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <dl className={styles.specs}>
            <dt>P/No.</dt>
            <dd>{productNumber(item, sku)}</dd>
            <dt>TYPE</dt>
            <dd>{frameTypeLabel(item)}</dd>
            <dt>PRICE</dt>
            <dd>
              {formatYen(item.selling_setting.price)}
              <small>税込</small>
            </dd>
          </dl>

          <p className={styles.description}>{item.localization.description}</p>

          {outOfStock ? (
            <button type="button" className={styles.cta} disabled>
              OUT OF STOCK
            </button>
          ) : (
            <a href={onlineStoreUrl(item, sku)} className={styles.cta} {...EXTERNAL_LINK}>
              ONLINE STORE
            </a>
          )}
          <p className={styles.ctaNote}>OWNDAYSオンラインストアに移動します</p>
        </div>
      </div>
    </div>
  );
}
