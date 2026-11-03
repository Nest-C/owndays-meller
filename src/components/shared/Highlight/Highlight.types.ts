import type { ReactNode } from 'react';

export interface HighlightProps {
  children: ReactNode;
  /** Seconds before the wipe starts */
  delay?: number;
  /** false = hold the hidden start state (e.g. until scrolled into view) */
  play?: boolean;
}
