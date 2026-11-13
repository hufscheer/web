import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Toaster } from '@hcc/ui';

import { AnalyticsProvider } from '~/app/analytics';
import installGuidePopupImage from '~/assets/install-guide-popup.webp';
import { Layout } from '~/components/layout';

import { Provider } from './provider';
import { ServiceWorkerRegister } from './service-worker';

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
  appleWebApp: {
    capable: true,
    title: '훕치치',
    statusBarStyle: 'default',
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
      <head>
        {/*
         * 팀 로고가 모두 이 오리진에서 내려온다. 연결을 미리 열어 LCP 경로에서 DNS·TLS 왕복을 뺀다.
         * 로고는 평범한 <img> 로 받으므로 CORS 요청이 아니다. crossOrigin 을 주면 연결 풀이
         * 갈려서 실제 이미지 요청이 이 연결을 재사용하지 못한다.
         */}
        <link rel="preconnect" href="https://images.hufscheer.com" />

        {/*
         * 설치 안내 팝업은 `useInstallGuidePopup` 이 `useEffect` 에서 열기 때문에 서버 HTML 에
         * 담기지 않는다. 그래서 `<Image priority>` 가 preload 를 만들어 주지 못하고, 브라우저는
         * 하이드레이션이 끝난 뒤에야 이미지를 받는다. 이 이미지는 화면을 덮는 크기라 그대로
         * LCP 요소가 되므로 여기서 직접 preload 한다. 페이지 안에서 걸면 head 가 이미 flush 된
         * 뒤라 RSC 스트림으로 밀려 늦는다.
         */}
        <link rel="preload" as="image" href={installGuidePopupImage.src} fetchPriority="high" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>

      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>

        <AnalyticsProvider />
        <ServiceWorkerRegister />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
