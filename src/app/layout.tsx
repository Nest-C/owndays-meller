import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { preload } from 'react-dom';
import { BRAND_COLOR, OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/site';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false, // Japanese glyphs are split by unicode-range; let the browser pick
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ['OWNDAYS', 'MELLER', 'サングラス', 'オンデーズ', 'メラー', 'コラボ'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'OWNDAYS',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // Fetch the two brand fonts used above the fold before the CSS asks for them
  preload('/fonts/Favorit-Bold.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/GTAmericaTrial-CmBl.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body>{children}</body>
    </html>
  );
}
