import type { PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { OrgGuard } from '../_components/org-guard';

// 요청마다 서버에서 그리지 않고 처음 요청 때 그린 결과를 캐시한다(ISR). 점수와 응원톡 같은 실시간 값은
// 클라이언트가 API 와 소켓으로 가져오므로 캐시된 HTML 과 무관하다. 홈처럼 서버에서 데이터를 미리 넣는 페이지는 따로 짧게 둔다
export const revalidate = 3600;

// 빌드 때는 아무 경로도 미리 그리지 않고, 처음 들어온 학교와 경기부터 그려 캐시한다
export const generateStaticParams = async () => [];

const SportLayout = ({ children }: PropsWithChildren) => (
  <>
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <OrgGuard />
      </Suspense>
    </ErrorBoundary>
    {children}
  </>
);

export default SportLayout;
