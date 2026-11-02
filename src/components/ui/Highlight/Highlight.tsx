import type { ReactNode } from 'react';
import styles from './Highlight.module.css';

interface HighlightProps {
  children: ReactNode;
  color?: 'brand' | 'white';
}

/**
 * Display text on a black block, one block per line —
 * the "PRODUCTS" / "HOW TO STYLE THEM" treatment in the design.
 */
export function Highlight({ children, color = 'brand' }: HighlightProps) {
  return (
    <span className={styles.highlight} data-color={color}>
      {children}
    </span>
  );
}
