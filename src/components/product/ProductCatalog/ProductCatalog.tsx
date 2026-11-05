'use client';

import { useCallback, useState } from 'react';
import { useProductDeepLink } from '@/hooks/useProductDeepLink';
import { ProductGrid } from '@/components/product/ProductGrid/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal/ProductModal';
import { HowToStyle } from '@/components/product/HowToStyle/HowToStyle';
import type { ProductCatalogProps } from './ProductCatalog.types';

export function ProductCatalog({ products }: ProductCatalogProps) {
  const { selection, open, selectSku, close } = useProductDeepLink(products);

  // Color shown on each card (product id → SKU index); unset = the product's default SKU
  const [cardSkus, setCardSkus] = useState<Record<number, number>>({});
  const selectCardSku = useCallback((productId: number, skuIndex: number) => {
    setCardSkus((prev) => (prev[productId] === skuIndex ? prev : { ...prev, [productId]: skuIndex }));
  }, []);

  // The modal's color carries over to its card, however it was set (chip, "+" item, deep link, Back).
  // Adjusted during render rather than in an effect, so the card never shows the old color for a frame.
  const [syncedSelection, setSyncedSelection] = useState(selection);
  if (selection !== syncedSelection) {
    setSyncedSelection(selection);
    if (selection) selectCardSku(selection.item.product.id, selection.skuIndex);
  }

  console.log('ProductCatalog render', { products});

  return (
    <>
      <ProductGrid products={products} cardSkus={cardSkus} onSelectSku={selectCardSku} onOpen={open} />
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
