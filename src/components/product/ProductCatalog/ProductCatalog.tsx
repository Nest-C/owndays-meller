'use client';

import { useProductDeepLink } from '@/hooks/useProductDeepLink';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal/ProductModal';
import { HowToStyle } from '@/components/product/HowToStyle/HowToStyle';
import type { ProductCatalogProps } from './ProductCatalog.types';

export function ProductCatalog({ products }: ProductCatalogProps) {
  // Stable callbacks: memoized cards don't re-render when the modal opens/closes
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
