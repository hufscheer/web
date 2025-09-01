'use client';

import { useSuspenseGames } from '~/api';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'FINISHED' });

  return (
    <div>
      {data.map(league => (
        <div key={league.leagueId}>{league.leagueName}</div>
      ))}
    </div>
  );
};
