import '@hcc/styles/globals';
import '@hcc/styles/colors';

import { Toaster } from '@hcc/ui';
import { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

import AnalyticsProvider from './analytics';
import Providers from './Providers';

extend(customParseFormat);

export const metadata: Metadata = {
  title: '훕치치',
  description: '한국외대 스포츠 플랫폼 훕치치',
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

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
        <AnalyticsProvider />
      </body>
    </html>
  );
};

export default RootLayout;
