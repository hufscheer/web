import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Layout } from '~/components/layout';
import { Pretendard } from './_fonts';
import { Provider } from './provider';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: '훕치치 매니저',
  description: '한국외대 스포츠 플랫폼 훕치치 매니저 페이지',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
