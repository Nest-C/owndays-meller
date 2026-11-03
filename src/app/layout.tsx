import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { preload } from 'react-dom';
import { BRAND_COLOR, OG_IMAGE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, SITE_URL } from '@/constants/site';
import { Footer } from '@/components/layout/Footer/Footer';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { InputModality } from '@/components/shared/InputModality/InputModality';
import './fonts.css';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false, // split by unicode-range; the browser picks what it needs
  variable: '--font-noto-sans-jp',
});

/** Above-the-fold brand fonts (navbar, hero title), fetched before the CSS asks for them — must match fonts.css */
const PRELOAD_FONTS = [
  'https://storage.owndays.com/meller/fonts/Favorit/Favorit-Bold.woff2',
  'https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBl.woff2',
];

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

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  for (const href of PRELOAD_FONTS) preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <InputModality />
      </body>
    </html>
  );
}
