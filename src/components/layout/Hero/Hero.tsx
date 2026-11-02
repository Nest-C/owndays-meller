import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import heroDesktop from '@/assets/images/hero-desktop.jpg';
import heroMobile from '@/assets/images/hero-mobile.jpg';
import { Highlight } from '@/components/ui/Highlight/Highlight';
import styles from './Hero.module.css';

/** Same breakpoint as the CSS (≥1024px = desktop) */
const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023.98px)';

/*
 * Art direction: Figma crops the same photo differently per breakpoint
 * (desktop 1440×633 = a strip across the glasses, mobile 390×677 = full portrait).
 * Each crop is its own file, so desktop never downloads the full portrait.
 * The orange grain overlay from Figma (30% opacity) is baked into both files.
 */
export function Hero() {
  const common = { alt: '', sizes: '100vw', fetchPriority: 'high', loading: 'eager' } as const;
  const { props: { srcSet: desktopSrcSet, src: desktopSrc } } = getImageProps({ ...common, src: heroDesktop });
  const { props: { srcSet: mobileSrcSet, ...img } } = getImageProps({ ...common, src: heroMobile });

  // Preload only the crop that matches the viewport (LCP image)
  preload(desktopSrc, { as: 'image', imageSrcSet: desktopSrcSet, imageSizes: '100vw', media: DESKTOP, fetchPriority: 'high' });
  preload(img.src, { as: 'image', imageSrcSet: mobileSrcSet, imageSizes: '100vw', media: MOBILE, fetchPriority: 'high' });

  return (
    <section id="about" className={styles.hero}>
      <picture>
        <source media={DESKTOP} srcSet={desktopSrcSet} sizes="100vw" />
        <img {...img} alt="" srcSet={mobileSrcSet} className={styles.photo} />
      </picture>
      <h1 className={styles.title}>
        <Highlight>PRODUCTS</Highlight>
      </h1>
    </section>
  );
}
