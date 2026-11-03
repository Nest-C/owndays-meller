'use client';

import { useCallback, useEffect, useState } from 'react';
import { NAV_LINKS, SITE_NAME } from '@/constants/site';
import { useScrolled } from '@/hooks/useScrolled';
import { HamburgerIcon } from '@/assets/icons';
import { SectionLink } from '@/components/shared/SectionLink/SectionLink';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

/** Transparent over the hero, orange once the page scrolls */
export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Every visit and refresh starts at the top: the browser must not restore the last scroll position
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <header className={styles.bar} data-solid={scrolled}>
        <div className={styles.inner}>
          <button type="button" aria-label={`${SITE_NAME} トップへ`} onClick={() => window.scrollTo({ top: 0 })}>
            <Logo />
          </button>

          <nav className={styles.nav} aria-label="メイン">
            {NAV_LINKS.map((link) => (
              <SectionLink key={link.label} section={link.section} className={styles.link}>
                {link.label}
              </SectionLink>
            ))}
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <HamburgerIcon width={20} height={24} />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
