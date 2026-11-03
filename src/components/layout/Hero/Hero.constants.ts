import heroDesktop from '@/assets/images/hero-desktop.jpg';
import heroMobile from '@/assets/images/hero-mobile.jpg';

export const DESKTOP = '(min-width: 1024px)';
export const MOBILE = '(max-width: 1023.98px)';

/** Static imports — next/image reads width/height from the files */
export const HERO_DESKTOP = { src: heroDesktop };
export const HERO_MOBILE = { src: heroMobile };
