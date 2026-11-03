'use client';

import { useEffect, useRef } from 'react';
import { NAV_LINKS, SUB_LINKS } from '@/constants/site';
import { useEscape } from '@/hooks/useEscape';
import { useScrollLock } from '@/hooks/useScrollLock';
import { CrossIcon } from '@/assets/icons';
import styles from './MobileMenu.module.css';
import type { MobileMenuProps } from './MobileMenu.types';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    // `inert` removes the closed menu from tab order and the accessibility tree
    <div className={styles.overlay} data-open={open} inert={!open} onClick={onClose}>
      <div
        id="mobile-menu"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} aria-label="メニューを閉じる" onClick={onClose}>
          <CrossIcon width={30} height={30} />
        </button>

        <ul className={styles.mainLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.mainLink} onClick={onClose}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className={styles.subLinks}>
          {SUB_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.subLink} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
