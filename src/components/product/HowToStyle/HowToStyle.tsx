import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { imageUrl, sortedImages } from '@/lib/format';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useInView } from '@/hooks/useInView';
import { Highlight } from '@/components/shared/Highlight/Highlight';
import { PlusIcon } from '@/assets/icons';
import { STYLE_ITEMS } from './HowToStyle.constants';
import styles from './HowToStyle.module.css';
import type { HowToStyleProps } from './HowToStyle.types';

export function HowToStyle({ products, onOpen }: HowToStyleProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  
  useDragScroll(trackRef);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef);

  const slides = useMemo(() => {
    const byCode = new Map(products.map((p) => [p.product.code, p]));
    return STYLE_ITEMS.flatMap((entry, i) => {
      const item = byCode.get(entry.productCode);
      if (!item) return [];

      const found = item.skus.findIndex((skus) => skus.code === entry.skuCode);
      const skuIndex = found >= 0 ? found : 0;
      const sku = item.skus[skuIndex];
      const images = sortedImages(sku);
      const productPhoto = images.length ? imageUrl(images[images.length - 1].path) : null;

      const src = entry.image ?? productPhoto;
      if (!src) return [];

      return [{ key: `${entry.productCode}-${i}`, item, skuIndex, src }];
    });
  }, [products]);

  return (
    <section className={styles.section} aria-labelledby="how-to-style-title">
      <h2 ref={headingRef} id="how-to-style-title" className={styles.heading}>
        <Highlight play={headingInView}>
          HOW TO
        </Highlight>
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
              onClick={() => {
                console.log('item', slide.item, 'skuIndex', slide.skuIndex);
                onOpen(slide.item, slide.skuIndex);
              }}
            >
              <PlusIcon width={47} height={47} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
