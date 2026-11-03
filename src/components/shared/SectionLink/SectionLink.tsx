'use client';

import type { SectionLinkProps } from './SectionLink.types';

/** In-page nav without #hash URLs: scrolls to `[data-section]`, so a refresh always starts at the top */
export function SectionLink({ section, className, onClick, children }: SectionLinkProps) {
  if (!section) return <span className={className}>{children}</span>;

  const scrollToSection = () => {
    onClick?.();
    // Next frame: a closing mobile menu has released its scroll lock by then
    requestAnimationFrame(() => document.querySelector(`[data-section='${section}']`)?.scrollIntoView());
  };

  return (
    <button type="button" className={className} onClick={scrollToSection}>
      {children}
    </button>
  );
}
