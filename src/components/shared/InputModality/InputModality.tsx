'use client';

import { useEffect } from 'react';

/**
 * Sets <html data-input="mouse|keyboard"> from the last interaction, so focus rings show only for
 * keyboard users. Browsers can flag code-driven focus (restoring focus, returning from a new tab)
 * as :focus-visible even after a mouse click.
 */
export function InputModality() {
  useEffect(() => {
    const root = document.documentElement;
    const onPointer = () => {
      root.dataset.input = 'mouse';
    };
    const onKey = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.altKey && !e.ctrlKey) root.dataset.input = 'keyboard';
    };
    window.addEventListener('pointerdown', onPointer, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onPointer, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, []);

  return null;
}
