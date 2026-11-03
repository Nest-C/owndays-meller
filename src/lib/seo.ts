import type { ProductItem } from '@/types/product';
import { SITE_NAME } from '@/constants/site';
import { defaultSkuIndex, imageUrl, isOutOfStock, onlineStoreUrl, sortedImages } from './product';

/** schema.org ItemList of Products (name, price, stock) for search engines */
export function productListJsonLd(products: ProductItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: SITE_NAME,
    numberOfItems: products.length,
    itemListElement: products.map((item, index) => {
      const sku = item.skus[defaultSkuIndex(item)];
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
            availability: `https://schema.org/${isOutOfStock(item) ? 'OutOfStock' : 'InStock'}`,
            url: sku ? onlineStoreUrl(item, sku) : undefined,
          },
        },
      };
    }),
  };
}

/** Escapes "<" so the JSON can't close the <script> tag */
export const toJsonLdString = (data: unknown): string => JSON.stringify(data).replace(/</g, '\\u003c');
