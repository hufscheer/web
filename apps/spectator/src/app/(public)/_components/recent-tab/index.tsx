'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSuspenseGames } from '~/api';
import { routes } from '~/constants/routes';
import { GameCard } from './game-card';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'PLAYING', size: 10 });

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

          <hr className="h-px w-full border-none bg-gray-100" />

          {league.games.map((game, index) => {
            if (game.gameTeams.length < 2) return null;

            return (
              <Fragment key={game.id}>
                <GameCard game={game} />
                {index !== league.games.length - 1 && (
                  <hr className="h-px w-full border-none bg-gray-100" />
                )}
              </Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};
