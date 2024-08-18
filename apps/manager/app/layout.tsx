import { Toaster } from '@hcc/ui';
import { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import Providers from './Providers';
import '@hcc/styles/dist/globals.css';
import '@hcc/styles/colors.css';

extend(customParseFormat);

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '훕치치 매니저',
  description: '한국외대 스포츠 플랫폼 훕치치, 매니저 페이지',
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
    <html lang="ko" data-hcc="manager">
      <head>
        <title>훕치치 매니저</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={pretendard.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
