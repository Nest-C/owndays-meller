import type { Color, ProductItem, Sku } from './types';

export const IMAGE_BASE_URL = 'https://storage.owndays.com/storage/';

export const imageUrl = (path: string): string => `${IMAGE_BASE_URL}${path}`;

const yen = new Intl.NumberFormat('ja-JP');

/** "¥7,800" — the tax suffix ("+tax" / "税込") is styled separately by each component */
export const formatYen = (price: number): string => `¥${yen.format(price)}`;

/** "ML2001D-6S C1" */
export const productNumber = (item: ProductItem, sku: Sku): string =>
  `${item.product.code} ${sku.code}`;

/** "SQUARE" */
export const frameTypeLabel = (item: ProductItem): string =>
  (item.frame_types[0]?.code ?? '').toUpperCase();

export const sortedImages = (sku: Sku) => [...sku.images].sort((a, b) => a.order - b.order);

export const skuThumbnail = (sku: Sku): string | null => {
  const first = sortedImages(sku)[0];
  return first ? imageUrl(first.path) : null;
};

/** CSS background for one color: solid hex, or the pattern image */
export const swatchBackground = (color: Color): string => {
  if (color.hex_code) return color.hex_code;
  if (color.path) return `url(${imageUrl(color.path)}) center / cover no-repeat`;
  return '#ccc';
};

/**
 * Swatch background for a whole SKU. Two-color SKUs (e.g. Black + Orange)
 * render as a diagonal split, matching the Figma swatches.
 */
export const skuSwatchBackground = (sku: Sku): string => {
  const [a, b] = sku.colors;
  if (!a) return '#ccc';
  if (!b) return swatchBackground(a);
  const second = b.hex_code ?? '#ccc';
  return a.hex_code
    ? `linear-gradient(135deg, ${a.hex_code} 50%, ${second} 50%)`
    : `linear-gradient(135deg, transparent 50%, ${second} 50%), ${swatchBackground(a)}`;
};

/** Localized color name, e.g. "Brown Demi" (en) — falls back to the default name */
export const colorName = (color: Color, lang = 'en'): string =>
  color.localizations.find((l) => l.language_code === lang)?.name ?? color.name;

/** Chip label for a SKU — multi-color SKUs are joined, e.g. "Black / Orange" */
export const skuColorLabel = (sku: Sku, lang = 'en'): string =>
  sku.colors.map((c) => colorName(c, lang)).join(' / ');

export const isOutOfStock = (item: ProductItem): boolean => item.selling_setting.in_stock === 0;

export const onlineStoreUrl = (item: ProductItem, sku: Sku): string =>
  `https://www.owndays.com/jp/ja/products/${item.product.code}?sku=${sku.id}`;
