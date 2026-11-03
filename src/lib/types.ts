export interface ColorLocalization {
  language_code: string;
  name: string;
}

export interface Color {
  id: number;
  code: string;
  name: string;
  /** Swatch pattern image path (used when hex_code is null) */
  path: string | null;
  hex_code: string | null;
  localizations: ColorLocalization[];
}

export interface ProductImage {
  id: number;
  path: string;
  path_webp: string | null;
  order: number;
}

export interface Sku {
  id: number;
  code: string;
  jan_code: string;
  try_on_code: string;
  order: number;
  size: string | null;
  is_default_display: number;
  is_online_exclusive: boolean;
  colors: Color[];
  images: ProductImage[];
  sizes: unknown[];
}

export interface Product {
  id: number;
  code: string;
  name: string | null;
  model_name: string;
  lens_width: string;
  lens_height: string;
  bridge_width: string;
  temple_depth: string;
  frame_weight: string;
  is_made_in_japan: boolean;
  is_free: boolean;
  size_frame: string;
  size_range: string;
}

export type FrameTypeCode = 'square' | 'boston' | 'polygon' | 'wellington' | (string & {});

export interface SellingSetting {
  id: number;
  country_code: string;
  /** Tax-included price */
  price: number;
  raw_price: number;
  code: string | null;
  is_published: boolean;
  status: number;
  in_stock: number;
}

export interface ProductItem {
  product: Product;
  product_line: { id: number; name: string; slug: string };
  product_type: { id: number; name: string };
  localization: {
    id: number;
    language_code: string;
    name: string | null;
    description: string;
  };
  nose_pad_type: { id: number; name: string };
  frame_types: { id: number; code: FrameTypeCode }[];
  materials: { id: number; name: string | null }[];
  tags: unknown[];
  selling_setting: SellingSetting;
  skus: Sku[];
}
