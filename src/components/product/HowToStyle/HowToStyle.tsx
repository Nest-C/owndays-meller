'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { imageUrl, sortedImages } from '@/lib/product';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useInView } from '@/hooks/useInView';
import { PlusIcon } from '@/assets/icons';
import { Highlight } from '@/components/shared/Highlight/Highlight';
import styles from './HowToStyle.module.css';
import type { HowToStyleProps } from './HowToStyle.types';
import { STYLE_ITEMS } from './HowToStyle.constants';

export function HowToStyle({ products, onOpen }: HowToStyleProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef);
  useDragScroll(trackRef);

  const slides = useMemo(() => {
    const byCode = new Map(products.map((p) => [p.product.code, p]));
    return STYLE_ITEMS.flatMap((entry, i) => {
      const item = byCode.get(entry.productCode);
      if (!item) return [];

      const skuIndex = Math.max(0, item.skus.findIndex((s) => s.code === entry.skuCode));
      const lastImage = sortedImages(item.skus[skuIndex]).at(-1);
      const src = entry.image ?? (lastImage && imageUrl(lastImage.path));
      if (!src) return [];

      return [{ key: `${entry.productCode}-${i}`, item, skuIndex, src }];
    });
  }, [products]);

  return (
    <section className={styles.section} aria-labelledby="how-to-style-title">
      <h2 ref={headingRef} id="how-to-style-title" className={styles.heading}>
        <Highlight play={headingInView}>HOW TO</Highlight>
        <Highlight delay={0.3} play={headingInView}>
          STYLE THEM
        </Highlight>
      </h2>

      <div ref={trackRef} className={styles.track}>
        {slides.map((slide) => (
          <div key={slide.key} className={styles.item}>
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
              onClick={() => onOpen(slide.item, slide.skuIndex)}
            >
              <PlusIcon width={47} height={47} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
