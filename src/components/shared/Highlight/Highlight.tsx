import type { CSSProperties } from 'react';
import styles from './Highlight.module.css';
import type { HighlightProps } from './Highlight.types';

/** Text on a black bar; intro: the bar wipes in, then a cover slides off to reveal the text */
export function Highlight({ children, delay = 0, play = true }: HighlightProps) {
  return (
    <span
      className={styles.highlight}
      data-play={play}
      style={{ '--wipe-delay': `${delay}s` } as CSSProperties}
    >
      <span className={styles.bg} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
      <span className={styles.cover} aria-hidden="true" />
    </span>
  );
}
