'use client';

import { Fragment } from 'react';
import { useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import Link from 'next/link';
import { routes } from '~/constants/routes';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'FINISHED', size: 20 });

  return (
    <div className="column h-full gap-3 overflow-y-auto p-5">
      {data.map(league => (
        <GameCard key={league.leagueId}>
          <GameCard.League league={league} />
          <GameCard.Divider />

          {league.games.map((game, index) => {
            if (game.gameTeams.length < 2) return null;

            return (
              <Fragment key={game.id}>
                <GameCard.Container>
                  <GameCard.Header game={game} />

                  <Link href={`/${routes.game(game.id)}`} className="row-between pt-2">
                    <GameCard.Team team={game.gameTeams[0]} position="home" />
                    <GameCard.Score game={game} />
                    <GameCard.Team team={game.gameTeams[1]} position="away" />
                  </Link>

                  <GameCard.Actions />
                </GameCard.Container>
                {index !== league.games.length - 1 && <GameCard.Divider />}
              </Fragment>
            );
          })}
        </GameCard>
      ))}
    </div>
  );
};
