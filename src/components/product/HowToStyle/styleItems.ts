/**
 * "HOW TO STYLE THEM" carousel content.
 *
 * Each entry links a lifestyle photo to the product its "+" button opens.
 * `image` is a path under /public — export the photos from Figma into
 * /public/images/style/. Without it the card shows that SKU's product photo.
 */
export interface StyleItem {
  productCode: string;
  skuCode: string;
  image?: string;
}

export const STYLE_ITEMS: StyleItem[] = [
  // e.g. { productCode: 'ML2005D-6S', skuCode: 'C1', image: '/images/style/style-01.jpg' },
  { productCode: 'ML2005D-6S', skuCode: 'C1' },
  { productCode: 'ML2001D-6S', skuCode: 'C1' },
  { productCode: 'ML2004D-6S', skuCode: 'C1' },
  { productCode: 'ML2002D-6S', skuCode: 'C2' },
  { productCode: 'ML2008D-6S', skuCode: 'C1' },
  { productCode: 'ML2003D-6S', skuCode: 'C2' },
  { productCode: 'ML2006D-6S', skuCode: 'C1' },
  { productCode: 'ML2007D-6S', skuCode: 'C1' },
  { productCode: 'ML2004D-6S', skuCode: 'C4' },
  { productCode: 'ML2005D-6S', skuCode: 'C3' },
  { productCode: 'ML2001D-6S', skuCode: 'C2' },
  { productCode: 'ML2003D-6S', skuCode: 'C4' },
];
