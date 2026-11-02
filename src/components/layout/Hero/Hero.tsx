import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { Highlight } from '@/components/shared/Highlight/Highlight';
import styles from './Hero.module.css';

const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023.98px)';

/** Files in /public/images — width/height are the files' pixel sizes */
const HERO_DESKTOP = { src: '/images/hero-desktop.jpg', width: 2560, height: 1125 };
const HERO_MOBILE = { src: '/images/hero-mobile.jpg', width: 1170, height: 2031 };

export function Hero() {
  const common = { alt: '', sizes: '100vw', fetchPriority: 'high', loading: 'eager' } as const;
  const { props: { srcSet: desktopSrcSet, src: desktopSrc } } = getImageProps({ ...common, ...HERO_DESKTOP });
  const { props: { srcSet: mobileSrcSet, ...img } } = getImageProps({ ...common, ...HERO_MOBILE });

  // Preload only the crop that matches the viewport (LCP image)
  preload(desktopSrc, { as: 'image', imageSrcSet: desktopSrcSet, imageSizes: '100vw', media: DESKTOP, fetchPriority: 'high' });
  preload(img.src, { as: 'image', imageSrcSet: mobileSrcSet, imageSizes: '100vw', media: MOBILE, fetchPriority: 'high' });

  return (
    <section id="about" className={styles.hero}>
      <picture>
        <source media={DESKTOP} srcSet={desktopSrcSet} sizes="100vw" />
        <img {...img} alt="" srcSet={mobileSrcSet} className={styles.heroImage} />
      </picture>
      <div className={styles.grain} aria-hidden="true" />
      <h1 className={styles.title}>
        <Highlight delay={0.6}>PRODUCTS</Highlight>
      </h1>
    </section>
  );
}
