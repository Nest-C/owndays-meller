import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { preload } from 'react-dom';
import { BRAND_COLOR, OG_IMAGE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, SITE_URL } from '@/constants/site';
import { Footer } from '@/components/layout/Footer/Footer';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false, // split by unicode-range; the browser picks what it needs
  variable: '--font-noto-sans-jp',
});

const share = { title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE] };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  openGraph: { ...share, type: 'website', locale: 'ja_JP', siteName: 'OWNDAYS', url: '/' },
  twitter: { ...share, card: 'summary_large_image' },
};

/** Brand fonts used above the fold — fetched before the CSS asks for them */
const PRELOAD_FONTS = ['/fonts/Favorit-Bold.woff2', '/fonts/GTAmericaTrial-CmBl.woff2'];

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  for (const href of PRELOAD_FONTS) preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body>
        <Navbar />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
