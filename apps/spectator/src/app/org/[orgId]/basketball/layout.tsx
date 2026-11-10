import type { PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { OrgGuard } from '../_components/org-guard';

// 요청마다 서버에서 그리지 않고 처음 요청 때 그린 결과를 캐시한다(ISR). 점수와 응원톡 같은 실시간 값은
// 클라이언트가 API 와 소켓으로 가져오므로 캐시된 HTML 과 무관하다. 홈은 서버에서 최근 경기를 미리 넣어(#567) 첫 화면이
// 최대 revalidate 만큼 오래된 점수일 수 있다. 데이터가 staleTime(60초)보다 오래됐으면 하이드레이션 직후 다시 가져온다.
// 다시 그릴 때마다 ISR 쓰기가 생기므로 주기를 짧게 하지 않는다
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
