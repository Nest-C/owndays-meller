/**
 * Absolute base for canonical + OG URLs. On Vercel it falls back to the production
 * domain Vercel sets at build time, so no env var is needed unless you add a custom domain.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');

/** Share image in /public (Figma frame "ogp_1200x630", compressed) */
export const OG_IMAGE = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'OWNDAYS × MELLER',
};

/** Same as `--color-brand` in globals.css — for places CSS can't reach (theme-color) */
export const BRAND_COLOR = '#ff6a1f';

export const SITE_TITLE = 'OWNDAYS × MELLER | PRODUCTS';
export const SITE_DESCRIPTION =
  'バルセロナ発のアイウェアブランド「MELLER」とOWNDAYSのコラボレーションサングラス。全8型のラインナップと着こなしをご紹介します。';

export const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'STORES', href: '#stores' },
] as const;

export const SUB_LINKS = [
  { label: 'CONTACT US', href: 'https://www.owndays.com/jp/ja/contact' },
  { label: 'PRIVACY POLICY', href: 'https://www.owndays.com/jp/ja/privacy' },
  { label: 'TERMS OF USE', href: 'https://www.owndays.com/jp/ja/terms' },
  { label: '特定商取引法表示', href: 'https://www.owndays.com/jp/ja/specified-commercial-transaction' },
] as const;

export const ALL_ITEMS_URL = 'https://www.owndays.com/jp/ja/products?productLines[]=88';
export const OWNDAYS_URL = 'https://www.owndays.com/jp/ja';
export const INSTAGRAM_URL = 'https://www.instagram.com/owndays_jp/';
