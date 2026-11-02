import type { CSSProperties, ReactNode } from 'react';
import styles from './Highlight.module.css';

interface HighlightProps {
  children: ReactNode;
  color?: 'brand' | 'white';
  /** Seconds before the wipe starts */
  delay?: number;
  /** false = hold the hidden start state (e.g. until scrolled into view) */
  play?: boolean;
}

/**
 * Display text on a black bar — the "PRODUCTS" / "HOW TO STYLE THEM" treatment in the design.
 * Intro: the bar wipes in left to right, then a cover slides off to reveal the text.
 */
export function Highlight({ children, color = 'brand', delay = 0, play = true }: HighlightProps) {
  return (
    <span
      className={styles.highlight}
      data-color={color}
      data-play={play}
      style={{ '--wipe-delay': `${delay}s` } as CSSProperties}
    >
      <span className={styles.bg} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
      <span className={styles.cover} aria-hidden="true" />
    </span>
  );
}
