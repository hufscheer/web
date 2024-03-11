import '@mantine/core/styles.css';
import '@hcc/styles/dist/globals.css';
import '@hcc/styles/dist/theme.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

import { mantineTheme } from '@/styles/theme';

import * as styles from './page.css';
import ReactQueryProvider from './ReactQueryProvider';

import 'dayjs/locale/ko';

interface RootLayoutProps {
  children: ReactNode;
}

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
        <ColorSchemeScript />
      </head>
      <body className={styles.layout}>
        <ReactQueryProvider>
          <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
