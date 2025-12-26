'use client';

import { useMemo, useState } from 'react';
import { CalendarGrid } from './calendar-grid';
import { GameCard } from './GameCard';
import { useSuspenseLeagues } from '~/api';
import Link from 'next/link';

export const CalendarOverview = () => {
  const [current, setCurrent] = useState(() => new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const days = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<number | null> = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  const goPrev = () => setCurrent(new Date(year, month - 1, 1));
  const goNext = () => setCurrent(new Date(year, month + 1, 1));

  const { data } = useSuspenseLeagues({ year, size: 50 });

  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <CalendarGrid year={year} month={month} days={days} onPrev={goPrev} onNext={goNext} />

      <div className="column gap-3">
        {data.map(league => (
          <Link href={''} key={league.leagueId}>
            <GameCard.Header league={league} />
            <GameCard.Match
              time="15:00"
              round="1/8"
              status="playing"
              team1={{ name: 'Team A', logoUrl: '/team-a-logo.png' }}
              team2={{ name: 'Team B', logoUrl: '/team-b-logo.png' }}
            />
            {/* <ErrorBoundary fallback={null}>
              <Suspense fallback={null} clientOnly>
                <LeagueCard.Teams leagueId={league.leagueId} />
              </Suspense>
            </ErrorBoundary> */}
          </Link>
        ))}
      </div>
    </div>
  );
};
