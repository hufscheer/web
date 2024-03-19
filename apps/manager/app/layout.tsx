import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@hcc/styles/dist/globals.css';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { mantineTheme } from '@/styles/theme';

import ReactQueryProvider from './ReactQueryProvider';

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
  themeColor: '#C5C8CE',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <title>훕치치 매니저</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
