'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { useSuspenseGames } from '~/api';
import { routes } from '~/constants/routes';
import { GameCard } from './game-card';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'FINISHED', size: 100 });

  return (
    <div className="column h-full gap-3 overflow-y-auto p-5">
      {data.map(league => (
        <div key={league.leagueId} className="column gap-3 rounded-lg border border-gray-100 p-4">
          <div className="row-between gap-3">
            <div className="center-y gap-3">
              <div className="center relative h-8 w-8 select-none overflow-hidden rounded-full bg-neutral-200">
                ⚽
              </div>
              <Typography weight="medium">{league.leagueName}</Typography>
            </div>

            <Link href={`/${routes.league(league.leagueId)}}`} className="center">
              <ChevronForwardIcon size={24} />
            </Link>
          </div>

          {league.games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ))}
    </div>
  );
};
