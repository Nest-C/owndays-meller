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

/** Title, description and keywords are copied verbatim from the Figma "Meta data" frame (assignment §5) */
export const SITE_TITLE = '商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス';
export const SITE_DESCRIPTION =
  'OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。';
export const SITE_KEYWORDS = [
  '商品一覧', 'サングラス', '偏光レンズ', 'Meller', 'メラー', 'アイウェア', 'フレーム', 'サステイナブ',
  'トレンド', 'バルセロナ', 'スペイン', 'OWNDAYS', 'オンデーズ', 'オンデイズ',
];

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
