import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductItem } from '@/lib/types';
import { defaultSkuIndex } from '@/lib/format';

export interface PanelSelection {
  item: ProductItem;
  skuIndex: number;
}

const PRODUCT_PARAM = 'product';
const COLOR_PARAM = 'color';

/** `?product=adisa&color=C1` → selection; unknown product → null, unknown color → default SKU */
function parseSelection(search: string, products: ProductItem[]): PanelSelection | null {
  const params = new URLSearchParams(search);
  const name = params.get(PRODUCT_PARAM)?.toLowerCase();
  if (!name) return null;

  const item = products.find((p) => p.product.model_name.toLowerCase() === name);
  if (!item || item.skus.length === 0) return null;

  const color = params.get(COLOR_PARAM)?.toLowerCase();
  const skuIndex = color ? item.skus.findIndex((s) => s.code.toLowerCase() === color) : -1;
  return { item, skuIndex: skuIndex >= 0 ? skuIndex : defaultSkuIndex(item) };
}

/** Current URL with the panel params set, or removed when null */
function buildUrl(selection: PanelSelection | null): string {
  const url = new URL(window.location.href);
  url.searchParams.delete(PRODUCT_PARAM);
  url.searchParams.delete(COLOR_PARAM);
  if (selection) {
    const sku = selection.item.skus[selection.skuIndex];
    url.searchParams.set(PRODUCT_PARAM, selection.item.product.model_name.toLowerCase());
    if (sku) url.searchParams.set(COLOR_PARAM, sku.code);
  }
  return url.pathname + url.search + url.hash;
}

/**
 * Keeps the product panel in sync with `?product=&color=` (spec §4.6) via the native History API,
 * which the App Router supports — no navigation, and the static HTML stays the same for any query.
 * open → push (Back closes) · color → replace · close → back() if we pushed, else replace.
 */
export function useProductDeepLink(products: ProductItem[]) {
  const [selection, setSelection] = useState<PanelSelection | null>(null);
  const pushedRef = useRef(false); // current history entry was pushed by open()
  const selectionRef = useRef(selection);
  useEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  useEffect(() => {
    const sync = () => setSelection(parseSelection(window.location.search, products));
    sync();

    const onPopState = () => {
      pushedRef.current = false;
      sync();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [products]);

  const open = useCallback((item: ProductItem, skuIndex = defaultSkuIndex(item)) => {
    const next = { item, skuIndex };
    setSelection(next);
    const method = pushedRef.current ? 'replaceState' : 'pushState';
    window.history[method](null, '', buildUrl(next));
    pushedRef.current = true;
  }, []);

  const selectSku = useCallback((skuIndex: number) => {
    const current = selectionRef.current;
    if (!current) return;
    const next = { ...current, skuIndex };
    setSelection(next);
    window.history.replaceState(null, '', buildUrl(next));
  }, []);

  const close = useCallback(() => {
    setSelection(null);
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, '', buildUrl(null));
    }
  }, []);

  return { selection, open, selectSku, close };
}
