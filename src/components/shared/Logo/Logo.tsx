import Image from 'next/image';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Image src="/logo.svg" alt="OWNDAYS × MELLER" width={351} height={52} preload className={styles.logo} />
  );
}
