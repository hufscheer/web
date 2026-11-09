'use client';

import { useSearchParams } from 'next/navigation';

import { LeagueCardList } from './league-card-list';
import { YearFilter } from './year-filter';

/**
 * `?year=` 을 서버 페이지에서 읽으면 요청마다 서버에서 렌더링돼 캐시할 수 없다. 그래서 클라이언트에서 읽는다
 */
export const PreviousLeagues = () => {
  const selectedYear = Number(useSearchParams().get('year')) || new Date().getFullYear();

  return (
    <>
      <YearFilter selectedYear={selectedYear} />
      <div className="column flex-1 px-5">
        <LeagueCardList year={selectedYear} />
      </div>
    </>
  );
};
