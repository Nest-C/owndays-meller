'use client';

import { useCallback, useState } from 'react';
import { NAV_LINKS, SITE_NAME } from '@/constants/site';
import { useScrolled } from '@/hooks/useScrolled';
import { HamburgerIcon } from '@/assets/icons';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

/** Transparent over the hero, orange once the page scrolls */
export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className={styles.bar} data-solid={scrolled}>
        <div className={styles.inner}>
          <a href="#top" aria-label={`${SITE_NAME} トップへ`}>
            <Logo />
          </a>

          <nav className={styles.nav} aria-label="メイン">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
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
