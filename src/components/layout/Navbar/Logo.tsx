import { getImageProps } from 'next/image';
import { MEDIA_DESKTOP, SITE_NAME } from '@/constants/site';
import styles from './Logo.module.css';

/** The mobile logo is its own 240×16 layout, not the desktop one scaled down — <picture> loads only the matching file */
export function Logo() {
  const desktop = getImageProps({ src: '/logo-desktop.svg', alt: '', width: 351, height: 52 }).props;
  const mobile = getImageProps({ src: '/logo-mobile.svg', alt: SITE_NAME, width: 240, height: 16, loading: 'eager' }).props;

  return (
    <picture>
      <source media={MEDIA_DESKTOP} srcSet={desktop.src} width={desktop.width} height={desktop.height} />
      <img {...mobile} alt={SITE_NAME} className={styles.logo} />
    </picture>
  );
}
