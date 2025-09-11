import '@hcc/ui/styles.css';
import '~/styles/globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { AnalyticsProvider } from '~/app/analytics';
import { Layout } from '~/components/layout';
import { Pretendard } from './_fonts';
import { Provider } from './provider';

export const metadata: Metadata = {
  title: { default: '훕치치', template: '%s | 훕치치' },
  description: '한국외대 스포츠 플랫폼 훕치치',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html dir="ltr" lang="ko">
      <body className={Pretendard.className}>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>

        <AnalyticsProvider />
      </body>
    </html>
  );
};

export default RootLayout;
