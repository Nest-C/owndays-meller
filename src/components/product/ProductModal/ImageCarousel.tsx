import { memo } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/format';
import styles from './ImageCarousel.module.css';
import type { ImageCarouselProps } from './ImageCarousel.types';

/**
 * Free horizontal scroll with snap. Slides are centered with the
 * neighbours peeking in on both sides (3 visible).
 */
export const ImageCarousel = memo(function ImageCarousel({ images, alt }: ImageCarouselProps) {
  return (
    <div className={styles.track} tabIndex={0} aria-label={`${alt} の画像`}>
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
});
