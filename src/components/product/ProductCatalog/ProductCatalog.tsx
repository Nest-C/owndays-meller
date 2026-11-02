'use client';

import type { ProductItem } from '@/lib/types';
import { useProductDeepLink } from '@/hooks/useProductDeepLink';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal/ProductModal';
import { HowToStyle } from '@/components/product/HowToStyle/HowToStyle';

/**
 * Client boundary for everything interactive about products.
 * Both the grid and the "How to style them" carousel open the same modal.
 * The open product + color live in the URL (`?product=adisa&color=C1`) so they can be shared.
 * (Still server-rendered to HTML — 'use client' only adds hydration.)
 */
export function ProductCatalog({ products }: { products: ProductItem[] }) {
  // open/selectSku/close are stable, so memoized cards don't re-render when the modal opens/closes
  const { selection, open, selectSku, close } = useProductDeepLink(products);

  return (
    <>
      <ProductGrid products={products} onOpen={open} />
      <HowToStyle products={products} onOpen={open} />
      {selection && (
        <ProductModal
          key={selection.item.product.id}
          item={selection.item}
          skuIndex={selection.skuIndex}
          onSelectSku={selectSku}
          onClose={close}
        />
      )}
    </>
  );
}
