import '~/styles/globals.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Provider } from './provider';

export const metadata: Metadata = {
  title: '훕치치 매니저',
  description: '대회 운영자를 위한 데스크탑 대시보드',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
