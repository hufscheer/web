'use client';

import { useSuspenseGames } from '~/api';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'FINISHED' });

  return (
    <div>
      {data.map(game => (
        <div key={game.id}>{game.gameName}</div>
      ))}
    </div>
  );
};
