import { COLLECTION_URL, EXTERNAL_LINK, INSTAGRAM_URL, NAV_LINKS, OWNDAYS_URL, SUB_LINKS } from '@/constants/site';
import { CartIcon, CopyIcon, InstagramIcon } from '@/assets/icons';
import { SectionLink } from '@/components/shared/SectionLink/SectionLink';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.left}>
          <nav className={styles.nav} aria-label="フッター">
            {NAV_LINKS.map((link) => (
              <SectionLink key={link.label} section={link.section} className={styles.navLink}>
                {link.label}
              </SectionLink>
            ))}
          </nav>
          <a href={INSTAGRAM_URL} className={styles.social} {...EXTERNAL_LINK} aria-label="Instagram">
            <InstagramIcon width={18} height={18} />
          </a>
        </div>

        <div className={styles.right}>
          <a href={COLLECTION_URL} className={styles.store} {...EXTERNAL_LINK}>
            <CartIcon width={22} height={22} /> ONLINE STORE
          </a>
          <a href={OWNDAYS_URL} className={styles.site} {...EXTERNAL_LINK}>
            OWNDAYS.COM <CopyIcon width={14} height={12} />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <nav className={styles.subNav} aria-label="規約・お問い合わせ">
          {SUB_LINKS.map((link) => (
            <a key={link.label} href={link.href} {...EXTERNAL_LINK}>
              {link.label}
            </a>
          ))}
        </nav>
        <small className={styles.copyright}>COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.</small>
      </div>
    </footer>
  );
}
