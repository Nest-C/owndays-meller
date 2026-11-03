'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/product';
import { useDragScroll } from '@/hooks/useDragScroll';
import styles from './ImageCarousel.module.css';
import type { ImageCarouselProps } from './ImageCarousel.types';

/** Snap-scrolling strip (touch, trackpad or mouse drag); the centred slide shows its neighbours */
export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  useDragScroll(trackRef);

  return (
    <div ref={trackRef} className={styles.track} tabIndex={0} role="region" aria-label={`${alt} の画像`}>
      {images.map((img, i) => (
        <div key={img.id} className={styles.slide}>
          <Image
            src={imageUrl(img.path)}
            alt={`${alt} ${i + 1}/${images.length}`}
            width={420}
            height={298}
            sizes="(min-width: 1024px) 420px, 74vw"
            loading={i < 2 ? 'eager' : 'lazy'}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}
