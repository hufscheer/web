'use client';

import { useSuspenseLeagues } from '~/api';
import { LeagueCard } from './league-card';
import { YearFilter } from './year-filter';

interface Props {
  year: number;
}

export const PreviousTab = ({ year }: Props) => {
  const { data } = useSuspenseLeagues({ year, leagueProgress: 'FINISHED', size: 10 });

  return (
    <div className="column h-full">
      <YearFilter year={year} />

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
