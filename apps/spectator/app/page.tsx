'use client';

import dayjs from 'dayjs';
import Link from 'next/link';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import { QUERY_PARAMS } from '@/constants/queryParams';
import useQueryParams from '@/hooks/useQueryParams';
import { GameStatus } from '@/types/game';

import LeagueList from './_components/LeagueList';
import SportsList from './_components/SportsList';
import { gameListWrapper, section } from './page.css';

export default function Page() {
  const { params, repeatIterator, appendToParams, setInParams } =
    useQueryParams();

  const selectedYear =
    Number.parseInt(params.get('year') as string) || dayjs().year();
  const selectedId = Number.parseInt(params.get('league_id') as string);

  const paramsObj = repeatIterator(
    {} as { status: GameStatus },
    params.entries(),
  );

  return (
    <section className={section}>
      <AsyncBoundary
        errorFallback={() => <div>에러</div>}
        loadingFallback={<div>스켈레톤</div>}
      >
        <LeagueList
          year={selectedYear}
          selectedLeagueId={selectedId}
          onClick={setInParams}
        />
      </AsyncBoundary>
      <AsyncBoundary
        errorFallback={() => <SportsList.Skeleton />}
        loadingFallback={<SportsList.Skeleton />}
      >
        <SportsList
          selectedId={paramsObj[QUERY_PARAMS.sports] as string[]}
          leagueId={params.get('leagueId') || '39'}
          onClick={appendToParams}
        />
      </AsyncBoundary>

      <AsyncBoundary
        errorFallback={() => <div>에러</div>}
        loadingFallback={<Loader />}
      >
        <Link href={`/game/52`}>
          <div className={gameListWrapper}>임시 게임 아이템 {'->'} 클릭</div>
        </Link>
      </AsyncBoundary>
    </section>
  );
}
