import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Toaster } from '@hcc/ui';

import { AnalyticsProvider } from '~/app/analytics';
import { Layout } from '~/components/layout';

import { Provider } from './provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hufscheer.com'),
  title: { default: '훕치치', template: '%s | 훕치치' },
  description: '한국외대 스포츠 플랫폼 훕치치',
  openGraph: {
    title: { default: '훕치치', template: '%s | 훕치치' },
  },
  twitter: {
    title: { default: '훕치치', template: '%s | 훕치치' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html dir="ltr" lang="ko">
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>

        <AnalyticsProvider />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
