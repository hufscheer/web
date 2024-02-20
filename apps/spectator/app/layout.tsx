import '@hcc/styles/dist/globals.css';

import { theme } from '@hcc/styles';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import GoogleAnalytics from './GoogleAnalytics';
import ReactQueryProvider from './ReactQueryProvider';

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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <GoogleAnalytics />
      <body style={{ margin: 'auto', maxWidth: theme.sizes.appWidth }}>
        <ReactQueryProvider>
          <Header />
          <main style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            {children}
            <Analytics />
          </main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
