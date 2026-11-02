import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductItem } from '@/lib/types';
import { defaultSkuIndex } from '@/lib/format';

export interface PanelSelection {
  item: ProductItem;
  skuIndex: number;
}

const PRODUCT_PARAM = 'product';
const COLOR_PARAM = 'color';

/** `?product=adisa&color=C1` → selection. Invalid product → null; invalid/missing color → default SKU. */
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

/** Current URL with the panel params set (selection) or removed (null); other params are kept. */
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
 * Keeps the product panel in sync with `?product=&color=` (spec §4.6).
 *
 * Uses the native History API, which Next.js App Router integrates with
 * (no navigation, no server round trip, no Suspense boundary needed for
 * useSearchParams on this static page). Next.js copies its own router state into
 * entries created with window.history.pushState/replaceState, so passing `null` is fine. The URL is read after hydration,
 * so the prerendered HTML is the same for every query string.
 *
 * - open:        pushState  → Back closes the panel
 * - change color: replaceState → Back doesn't step through every color
 * - close:       history.back() if we pushed the entry, otherwise replaceState
 *                (the page was loaded with the params, there is nothing to go back to)
 * - popstate:    re-read the URL (Back/Forward between product states)
 */
export function useProductDeepLink(products: ProductItem[]) {
  const [selection, setSelection] = useState<PanelSelection | null>(null);
  /** true when the current history entry was pushed by `open` */
  const pushedRef = useRef(false);
  /** Latest selection for callbacks, so they stay stable (memoized cards don't re-render) */
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
    if (pushedRef.current) {
      window.history.replaceState(null, '', buildUrl(next));
    } else {
      window.history.pushState(null, '', buildUrl(next));
      pushedRef.current = true;
    }
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
