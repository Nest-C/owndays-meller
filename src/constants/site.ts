// On Vercel, falls back to the production domain; set NEXT_PUBLIC_SITE_URL only for a custom domain
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');

export const SITE_NAME = 'OWNDAYS × MELLER';

export const OG_IMAGE = { url: '/images/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME };

/** Art-direction breakpoints for <picture> sources (CSS uses the same 1024px literal) */
export const MEDIA_DESKTOP = '(min-width: 1024px)';
export const MEDIA_MOBILE = '(max-width: 1023.98px)';

/** Same as --color-brand in globals.css, for theme-color */
export const BRAND_COLOR = '#f26a2f';

// Copied verbatim from the Figma "Meta data" frame (assignment §5)
export const SITE_TITLE = '商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス';
export const SITE_DESCRIPTION =
  'OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。';
export const SITE_KEYWORDS = [
  '商品一覧', 'サングラス', '偏光レンズ', 'Meller', 'メラー', 'アイウェア', 'フレーム', 'サステイナブ',
  'トレンド', 'バルセロナ', 'スペイン', 'OWNDAYS', 'オンデーズ', 'オンデイズ',
];

export const IMAGE_BASE_URL = 'https://storage.owndays.com/storage/';
export const OWNDAYS_URL = 'https://www.owndays.com/jp/ja';
export const ALL_ITEMS_URL = `${OWNDAYS_URL}/products?productLines[]=88`;
export const INSTAGRAM_URL = 'https://www.instagram.com/owndays_jp/';

/** Spread onto <a> for links that open a new tab */
export const EXTERNAL_LINK = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** In-page nav: `section` matches a `data-section` attribute (ProductGrid); null = label only, no action */
export const NAV_LINKS = [
  { label: 'ABOUT', section: null },
  { label: 'PRODUCTS', section: 'products' },
  { label: 'STORES', section: null },
] as const;

export const SUB_LINKS = [
  { label: 'CONTACT US', href: `${OWNDAYS_URL}/contact` },
  { label: 'PRIVACY POLICY', href: `${OWNDAYS_URL}/privacy` },
  { label: 'TERMS OF USE', href: `${OWNDAYS_URL}/terms` },
  { label: '特定商取引法表示', href: `${OWNDAYS_URL}/specified-commercial-transaction` },
] as const;
