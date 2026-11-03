import type { Color, ProductItem, Sku } from '@/types/product';
import { IMAGE_BASE_URL, OWNDAYS_URL } from '@/constants/site';

const FALLBACK_COLOR = '#ccc';
const yen = new Intl.NumberFormat('ja-JP');

export const imageUrl = (path: string): string => `${IMAGE_BASE_URL}${path}`;

/** "¥7,800" — each component adds its own tax suffix */
export const formatYen = (price: number): string => `¥${yen.format(price)}`;

/** "ML2001D-6S C1" */
export const productNumber = (item: ProductItem, sku: Sku): string => `${item.product.code} ${sku.code}`;

/** "SQUARE" */
export const frameTypeLabel = (item: ProductItem): string => (item.frame_types[0]?.code ?? '').toUpperCase();

/** The SKU with the lowest `order` (spec §4.6) */
export const defaultSkuIndex = (item: ProductItem): number =>
  item.skus.reduce((best, sku, i, skus) => (sku.order < skus[best].order ? i : best), 0);

export const sortedImages = (sku: Sku) => [...sku.images].sort((a, b) => a.order - b.order);

export const skuThumbnail = (sku: Sku): string | null => {
  const first = sortedImages(sku)[0];
  return first ? imageUrl(first.path) : null;
};

/** Solid hex, or the pattern image when hex_code is null */
const swatchBackground = (color: Color): string => {
  if (color.hex_code) return color.hex_code;
  if (color.path) return `url(${imageUrl(color.path)}) center / cover no-repeat`;
  return FALLBACK_COLOR;
};

/** Two-color SKUs are split diagonally, as in Figma */
export const skuSwatchBackground = (sku: Sku): string => {
  const [a, b] = sku.colors;
  if (!a) return FALLBACK_COLOR;
  if (!b) return swatchBackground(a);
  const second = b.hex_code ?? FALLBACK_COLOR;
  return a.hex_code
    ? `linear-gradient(135deg, ${a.hex_code} 50%, ${second} 50%)`
    : `linear-gradient(135deg, transparent 50%, ${second} 50%), ${swatchBackground(a)}`;
};

const colorName = (color: Color, lang: string): string =>
  color.localizations.find((l) => l.language_code === lang)?.name ?? color.name;

/** "Black / Orange" */
export const skuColorLabel = (sku: Sku, lang = 'en'): string =>
  sku.colors.map((c) => colorName(c, lang)).join(' / ');

export const isOutOfStock = (item: ProductItem): boolean => item.selling_setting.in_stock === 0;

export const onlineStoreUrl = (item: ProductItem, sku: Sku): string =>
  `${OWNDAYS_URL}/products/${item.product.code}?sku=${sku.id}`;
