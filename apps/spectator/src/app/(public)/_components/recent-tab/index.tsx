'use client';

import { Fragment } from 'react';
import { useSuspenseGames } from '~/api';
import { LeagueCard } from './league-card';

export const RecentTab = () => {
  const { data } = useSuspenseGames({ state: 'FINISHED', size: 20 });

  return (
    <div className="column h-full gap-3 overflow-y-auto p-5">
      {data.map(league => (
        <LeagueCard key={league.leagueId}>
          <LeagueCard.Title league={league} />
          <LeagueCard.Divider />

          {league.games.map((game, index) => {
            if (game.gameTeams.length < 2) return null;

            return (
              <Fragment key={game.id}>
                <LeagueCard.Game>
                  <LeagueCard.GameHeader game={game} />

                  <div className="row-between mt-2">
                    <LeagueCard.GameTeam team={game.gameTeams[0]} position="home" />
                    <LeagueCard.GameScore game={game} />
                    <LeagueCard.GameTeam team={game.gameTeams[1]} position="away" />
                  </div>

                  <LeagueCard.GameActions />
                </LeagueCard.Game>
                {index !== league.games.length - 1 && <LeagueCard.Divider />}
              </Fragment>
            );
          })}
        </LeagueCard>
      ))}
    </div>
  );
};
