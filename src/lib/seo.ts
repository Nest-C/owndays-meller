import type { ProductItem } from './types';
import { imageUrl, isOutOfStock, onlineStoreUrl, sortedImages } from './format';

/** schema.org ItemList of Products — lets search engines read name, price and stock. */
export function productListJsonLd(products: ProductItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OWNDAYS × MELLER',
    numberOfItems: products.length,
    itemListElement: products.map((item, index) => {
      const sku = item.skus[0];
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${item.product_line.name} ${item.product.model_name}`,
          sku: item.product.code,
          description: item.localization.description,
          category: item.product_type.name,
          brand: { '@type': 'Brand', name: item.product_line.name },
          image: sku ? sortedImages(sku).slice(0, 3).map((img) => imageUrl(img.path)) : [],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'JPY',
            price: item.selling_setting.price,
            availability: isOutOfStock(item)
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
            url: sku ? onlineStoreUrl(item, sku) : undefined,
          },
        },
      };
    }),
  };
}

/** Safe to drop into a <script> tag: escapes "<" so no "</script>" can break out. */
export const toJsonLdString = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');
