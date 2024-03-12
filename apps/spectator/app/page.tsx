'use client';

import dayjs from 'dayjs';
import Link from 'next/link';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useQueryParams from '@/hooks/useQueryParams';

import LeagueList from './_components/LeagueList';
import SportsList from './_components/SportsList';
import { gameListWrapper, section } from './page.css';

export default function Page() {
  const { params, setInParams } = useQueryParams();

  const selectedYear = params.get('year') || String(dayjs().year());
  const selectedLeagueId = params.get('league_id') || '39';
  const selectedSportId = params.get('sport_id') || '';

  return (
    <section className={section}>
      <AsyncBoundary
        errorFallback={() => <div>에러</div>}
        loadingFallback={<div>스켈레톤</div>}
      >
        <LeagueList
          year={selectedYear}
          selectedLeagueId={selectedLeagueId}
          onClick={setInParams}
        />
      </AsyncBoundary>
      <AsyncBoundary errorFallback={() => <></>} loadingFallback={<></>}>
        <SportsList
          selectedSportId={selectedSportId}
          leagueId={selectedLeagueId}
          onClick={setInParams}
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
