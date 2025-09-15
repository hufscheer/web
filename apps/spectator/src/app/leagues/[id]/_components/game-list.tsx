'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { type GameStateType, useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

type Props = {
  leagueId: number;
  round: number;
  selectedTeams: number[];
};

const GameListContent = ({
  state,
  leagueId,
  round,
  selectedTeams,
}: Props & { state: GameStateType }) => {
  const { data } = useSuspenseGames({
    state,
    round,
    league_id: leagueId,
    league_team_id: selectedTeams.join(','),
    size: 20,
  });

  return (
    <Fragment>
      {data.map(league =>
        league.games.map((game, index) => {
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
        }),
      )}
    </Fragment>
  );
};

export const GameList = (props: Props) => {
  const states: GameStateType[] = ['PLAYING', 'SCHEDULED', 'FINISHED'];

  return (
    <div className="column h-full gap-3 overflow-y-auto bg-white p-5">
      {states.map(state => (
        <GameListContent key={state} state={state} {...props} />
      ))}
    </div>
  );
};
