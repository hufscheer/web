import '@hcc/styles/dist/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import * as styles from './layout.css';
import Providers from './providers';

import 'dayjs/locale/ko';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '훕치치!',
  description: '한국외대 스포츠 플랫폼',
  icons: {
    icon: '/icon_hufscheer.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F8F9',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={styles.root}>
      <head>
        <title>훕치치!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <main className={styles.body}>
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
