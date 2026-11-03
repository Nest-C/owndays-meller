import Image from 'next/image';
import { SITE_NAME } from '@/constants/site';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Image src="/logo.svg" alt={SITE_NAME} width={351} height={52} preload className={styles.logo} />
  );
}
