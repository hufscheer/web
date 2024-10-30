import { Toaster } from '@hcc/ui';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { clsx } from 'clsx';
import { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import * as styles from './layout.css';
import Providers from './Providers';
import '@hcc/styles/dist/globals.css';
import '@hcc/styles/colors.css';

extend(customParseFormat);

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '훕치치!',
  description: '한국외대 스포츠 플랫폼 훕치치',
  icons: {
    icon: '/icon_hufscheer.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

const pretendard = localFont({
  src: './_fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <title>훕치치!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={clsx(pretendard.className, styles.body)}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
