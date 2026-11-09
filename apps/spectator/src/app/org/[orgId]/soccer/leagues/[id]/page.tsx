import type { Metadata } from 'next';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { LeagueDetailType } from '~/api';

import { fetchLeague } from '~/api';
import { ErrorMessage } from '~/app/org/[orgId]/_components/error-message';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../../_constants';
import { LeagueDetail } from '../_components/league-detail';

type Props = {
  params: Promise<{ orgId: string; id: string }>;
};

const Page = async ({ params }: Props) => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ orgId, sport: SPORT_TYPE }));
  }

  return (
    <>
      <Header.Root
        left={<Header.Arrow />}
        center={<Header.LinkLogo sport={SPORT_TYPE} orgId={orgId} />}
      />
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <LeagueDetail leagueId={id} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Page;

// 빌드 때는 미리 그리지 않고 처음 요청 때 그려 캐시한다(주기는 상위 layout 의 revalidate)
export const generateStaticParams = async () => [];

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  // 캐시(ISR)되는 페이지는 메타데이터 오류가 곧 페이지 오류(500)가 된다. 제목 없이 그리고 본문은 클라이언트가 가져온다
  const league: LeagueDetailType | null = await fetchLeague({ leagueId: id }).catch(() => null);
  if (!league) return {};

  const title = league.name;
  const url = routes.league({ orgId, id, sport: SPORT_TYPE });

  return {
    title,
    openGraph: { title, url },
    twitter: { title },
  };
};
