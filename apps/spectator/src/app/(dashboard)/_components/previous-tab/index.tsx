'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useSuspenseLeagues } from '~/api';
import { LeagueCard } from './league-card';
import { YearFilter } from './year-filter';

export const PreviousTab = () => {
  const current = new Date().getFullYear();
  const [year] = useQueryState('year', parseAsInteger.withDefault(current));

  const { data } = useSuspenseLeagues({ year, leagueProgress: 'FINISHED', size: 10 });

  return (
    <div className="column h-full">
      <YearFilter />

      <div className="column mb-5 flex-1 gap-3 overflow-y-auto px-5">
        {data.map(league => (
          <LeagueCard key={league.leagueId}>
            <LeagueCard.Header league={league} />
            <LeagueCard.Divider />
          </LeagueCard>
        ))}
      </div>
    </div>
  );
};
