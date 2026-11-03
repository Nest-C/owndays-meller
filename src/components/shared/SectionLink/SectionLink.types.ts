import type { ReactNode } from 'react';
import type { NAV_LINKS } from '@/constants/site';

export interface SectionLinkProps {
  /** Matches a `data-section` attribute on the page; null renders plain text with no action */
  section: (typeof NAV_LINKS)[number]['section'];
  className?: string;
  /** Runs before scrolling, e.g. to close the mobile menu */
  onClick?: () => void;
  children: ReactNode;
}
