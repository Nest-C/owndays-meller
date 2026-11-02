'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ProductItem } from '@/lib/types';
import {
  formatYen,
  frameTypeLabel,
  isOutOfStock,
  onlineStoreUrl,
  productNumber,
  skuColorLabel,
  sortedImages,
} from '@/lib/format';
import { useEscape } from '@/hooks/useEscape';
import { useScrollLock } from '@/hooks/useScrollLock';
import { CrossIcon } from '@/components/ui/icons';
import { ImageCarousel } from './ImageCarousel';
import styles from './ProductModal.module.css';

/** Must match the animation duration in ProductModal.module.css */
const EXIT_MS = 300;

interface ProductModalProps {
  item: ProductItem;
  onClose: () => void;
}

/** Mounted only while a product is selected; plays its own exit animation. */
export function ProductModal({ item, onClose }: ProductModalProps) {
  const [skuIndex, setSkuIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const sku = item.skus[skuIndex] ?? item.skus[0];
  const outOfStock = isOutOfStock(item);
  const titleId = `product-modal-title-${item.product.id}`;

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, EXIT_MS);
  }, [closing, onClose]);

  useScrollLock(true);
  useEscape(true, requestClose);

  // Move focus into the dialog, give it back to the trigger on close
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus?.({ preventScroll: true });
  }, []);

  // Keep Tab inside the dialog
  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  return (
    <div className={styles.root} data-state={closing ? 'closing' : 'open'} onKeyDown={trapFocus}>
      <div className={styles.backdrop} onClick={requestClose} aria-hidden="true" />

      <div ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className={styles.top}>
          <div className={styles.topBar}>
            <h2 id={titleId} className={styles.title}>
              {item.product.model_name}
            </h2>
            <button ref={closeRef} type="button" className={styles.close} aria-label="閉じる" onClick={requestClose}>
              <CrossIcon />
            </button>
          </div>

          {/* key: restart scroll position when the color changes */}
          <ImageCarousel key={sku.id} images={sortedImages(sku)} alt={`${item.product.model_name} ${sku.code}`} />

          <div className={styles.chips} role="radiogroup" aria-label="カラー">
            {item.skus.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={i === skuIndex}
                className={styles.chip}
                onClick={() => setSkuIndex(i)}
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
            <a href={onlineStoreUrl(item, sku)} className={styles.cta} target="_blank" rel="noopener noreferrer">
              ONLINE STORE
            </a>
          )}
          <p className={styles.ctaNote}>OWNDAYSオンラインストアに移動します</p>
        </div>
      </div>
    </div>
  );
}
