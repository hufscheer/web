import '@mantine/core/styles.css';
import '@hcc/styles/dist/globals.css';
import '@hcc/styles/dist/theme.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

import { mantineTheme } from '@/styles/theme';

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
      <body>
        <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
