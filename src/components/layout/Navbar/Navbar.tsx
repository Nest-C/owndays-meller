'use client';

import { useCallback, useState } from 'react';
import { NAV_LINKS } from '@/constants/site';
import { useScrolled } from '@/hooks/useScrolled';
import { HamburgerIcon } from '@/components/shared/icons';
import { Logo } from '@/components/shared/Logo/Logo';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

/**
 * Sticky navbar. Transparent over the hero photo (as in Figma),
 * brand orange once the page scrolls.
 */
export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className={styles.bar} data-solid={scrolled}>
        <div className={styles.inner}>
          <a href="#top" aria-label="OWNDAYS × MELLER トップへ">
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
            <HamburgerIcon />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
