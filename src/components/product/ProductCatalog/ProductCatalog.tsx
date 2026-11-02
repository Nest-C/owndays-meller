'use client';

import { useCallback, useState } from 'react';
import type { ProductItem } from '@/lib/types';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal/ProductModal';
import { HowToStyle } from '@/components/product/HowToStyle/HowToStyle';

/**
 * Client boundary for everything interactive about products.
 * Both the grid and the "How to style them" carousel open the same modal.
 * (Still server-rendered to HTML — 'use client' only adds hydration.)
 */
export function ProductCatalog({ products }: { products: ProductItem[] }) {
  const [selected, setSelected] = useState<ProductItem | null>(null);

  // Stable callbacks so memoized cards don't re-render when the modal opens/closes
  const openProduct = useCallback((item: ProductItem) => setSelected(item), []);
  const closeProduct = useCallback(() => setSelected(null), []);

  return (
    <>
      <ProductGrid products={products} onOpen={openProduct} />
      <HowToStyle products={products} onOpen={openProduct} />
      {selected && <ProductModal key={selected.product.id} item={selected} onClose={closeProduct} />}
    </>
  );
}
