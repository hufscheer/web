import '@hcc/styles/dist/globals.css';
import '@hcc/styles/dist/theme.css';

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

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <GoogleAnalytics />
      <body style={{ margin: 'auto', maxWidth: '28rem' }}>
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
