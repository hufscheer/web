'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return data.map((league) => {
    const sortedGames = [...league.games].sort(
      (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );
    return sortedGames.map((game, index) => {
      if (game.gameTeams.length < 2) return null;
      const link = routes.game({ id: game.id, sport: league.sportType });

      return (
        <Fragment key={game.id}>
          <GameCard game={game}>
            <GameCard.Container className="gap-4">
              <GameCard.Header state={state} />

              <div className="flex gap-4">
                <Link href={link} className="column flex-1 gap-2">
                  <GameCard.Team index={1} />
                  <GameCard.Team index={2} />
                </Link>

                <div role="separator" className="w-px bg-gray-100" />

                <GameCard.Actions
                  onBroadcastClick={() => router.push(link)}
                  onCheerClick={() => router.push(`/${link}?cheer=1`)}
                />
              </div>
            </GameCard.Container>
          </GameCard>
          {index !== sortedGames.length - 1 && <GameCard.Divider />}
        </Fragment>
      );
    });
  });
};

export const GameList = (props: Props) => {
  const states: GameStateType[] = ['PLAYING', 'SCHEDULED', 'FINISHED'];

  return (
    <div className="column gap-3 p-5">
      {states.map((state) => (
        <GameListContent key={state} state={state} {...props} />
      ))}
    </div>
  );
};
