import { ALL_ITEMS_URL, INSTAGRAM_URL, NAV_LINKS, OWNDAYS_URL, SUB_LINKS } from '@/constants/site';
import { CartIcon, ExternalIcon, InstagramIcon } from '@/components/shared/icons';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="stores" className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.left}>
          <nav className={styles.nav} aria-label="フッター">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a href={INSTAGRAM_URL} className={styles.social} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>

        <div className={styles.right}>
          <a href={ALL_ITEMS_URL} className={styles.store} target="_blank" rel="noopener noreferrer">
            <CartIcon /> ONLINE STORE
          </a>
          <a href={OWNDAYS_URL} className={styles.site} target="_blank" rel="noopener noreferrer">
            OWNDAYS.COM <ExternalIcon />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <nav className={styles.subNav} aria-label="規約・お問い合わせ">
          {SUB_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
        <small>COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.</small>
      </div>
    </footer>
  );
}
