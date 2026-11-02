import { useMemo, useRef } from 'react';
import Image from 'next/image';
import type { ProductItem } from '@/lib/types';
import { imageUrl, sortedImages } from '@/lib/format';
import { useDragScroll } from '@/hooks/useDragScroll';
import { Highlight } from '@/components/ui/Highlight/Highlight';
import { PlusIcon } from '@/components/ui/icons';
import { STYLE_ITEMS } from './styleItems';
import styles from './HowToStyle.module.css';

interface HowToStyleProps {
  products: ProductItem[];
  onOpen: (item: ProductItem) => void;
}

export function HowToStyle({ products, onOpen }: HowToStyleProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  useDragScroll(trackRef);

  const slides = useMemo(() => {
    const byCode = new Map(products.map((p) => [p.product.code, p]));
    return STYLE_ITEMS.flatMap((entry, i) => {
      const item = byCode.get(entry.productCode);
      if (!item) return [];
      const sku = item.skus.find((s) => s.code === entry.skuCode) ?? item.skus[0];
      const images = sortedImages(sku);
      const productPhoto = images.length ? imageUrl(images[images.length - 1].path) : null;
      const src = entry.image ?? productPhoto;
      if (!src) return [];
      return [{ key: `${entry.productCode}-${i}`, item, src, isProductPhoto: !entry.image }];
    });
  }, [products]);

  return (
    <section className={styles.section} aria-labelledby="how-to-style-title">
      <h2 id="how-to-style-title" className={styles.heading}>
        <Highlight color="white">HOW TO</Highlight>
        <br />
        <Highlight color="white">STYLE THEM</Highlight>
      </h2>

      <div ref={trackRef} className={styles.track}>
        {slides.map((slide) => (
          <div key={slide.key} className={styles.item} data-product-photo={slide.isProductPhoto}>
            <Image
              src={slide.src}
              alt={`${slide.item.product.model_name} の着用イメージ`}
              fill
              sizes="(min-width: 1024px) 405px, 326px"
              className={styles.image}
            />
            <button
              type="button"
              className={styles.plus}
              aria-label={`${slide.item.product.model_name} の詳細を見る`}
              onClick={() => onOpen(slide.item)}
            >
              <PlusIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
