import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { MEDIA_DESKTOP, MEDIA_MOBILE } from '@/constants/site';
import heroDesktop from '@/assets/images/hero-desktop.jpg';
import heroMobile from '@/assets/images/hero-mobile.jpg';
import { Highlight } from '@/components/shared/Highlight/Highlight';
import styles from './Hero.module.css';

export function Hero() {
  const common = { alt: '', sizes: '100vw', fetchPriority: 'high', loading: 'eager' } as const;
  const desktop = getImageProps({ ...common, src: heroDesktop }).props;
  const { srcSet: mobileSrcSet, ...img } = getImageProps({ ...common, src: heroMobile }).props;

  // LCP image: preload only the crop that matches the viewport
  const crops = [
    { src: desktop.src, srcSet: desktop.srcSet, media: MEDIA_DESKTOP },
    { src: img.src, srcSet: mobileSrcSet, media: MEDIA_MOBILE },
  ];
  for (const { src, srcSet, media } of crops) {
    preload(src, { as: 'image', imageSrcSet: srcSet, imageSizes: '100vw', media, fetchPriority: 'high' });
  }

  return (
    <section className={styles.hero}>
      <picture>
        <source media={MEDIA_DESKTOP} srcSet={desktop.srcSet} sizes="100vw" />
        <img {...img} alt="" srcSet={mobileSrcSet} className={styles.heroImage} />
      </picture>
      <div className={styles.grain} aria-hidden="true" />
      <h1 className={styles.title}>
        <Highlight delay={0.6}>PRODUCTS</Highlight>
      </h1>
    </section>
  );
}
