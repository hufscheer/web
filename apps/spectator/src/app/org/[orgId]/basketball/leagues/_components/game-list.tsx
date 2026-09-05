'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import type { SportType } from '~/api/types';

import { type GameListType, type GameStateType, useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';

type Props = {
  leagueId: number;
  round: number;
  thirdPlaceMatch: boolean;
  selectedTeams: number[];
  sportType: SportType;
};

const GameListContent = ({
  sportType,
  games,
}: Pick<Props, 'sportType'> & { games: GameListType[] }) => {
  const router = useRouter();
  const { organizationId } = useOrganizationId();
  const sortedGames = [...games].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

  return sortedGames.map((game, index) => {
    if (game.gameTeams.length < 2) return null;
    const pathname = routes.game({ orgId: organizationId, id: game.id, sport: sportType });

    return (
      <Fragment key={game.id}>
        <GameCard game={game}>
          <GameCard.Container className="gap-4">
            <GameCard.Header />

            <div className="flex gap-4">
              <Link href={pathname} className="column flex-1 gap-2">
                <GameCard.Team index={1} />
                <GameCard.Team index={2} />
              </Link>

              <div role="separator" className="w-px bg-gray-100" />

              <GameCard.Actions
                onBroadcastClick={() => router.push(pathname)}
                onCheerClick={() => router.push(`${pathname}?cheer=1`)}
              />
            </div>
          </GameCard.Container>
        </GameCard>
        {index !== sortedGames.length - 1 && <GameCard.Divider />}
      </Fragment>
    );
  });
};

export const GameList = (props: Props) => {
  const states: GameStateType[] = ['PLAYING', 'SCHEDULED', 'FINISHED'];
  const query = {
    round: props.round,
    third_place_match: props.thirdPlaceMatch || undefined,
    league_id: props.leagueId,
    league_team_id: props.selectedTeams.join(','),
    size: 20,
  };
  const { data: playing } = useSuspenseGames({ ...query, state: 'PLAYING' });
  const { data: scheduled } = useSuspenseGames({ ...query, state: 'SCHEDULED' });
  const { data: finished } = useSuspenseGames({ ...query, state: 'FINISHED' });
  const gamesByState = [playing, scheduled, finished].map((data) =>
    data.content.flatMap((league) => league.games),
  );

  if (gamesByState.every((games) => games.length === 0)) {
    return (
      <div className="p-5 text-center text-sm font-medium text-neutral-500">
        선택한 팀의 경기 데이터가 없어요
      </div>
    );
  }

  return (
    <div className="column gap-3 p-5">
      {states.map((state, index) => (
        <GameListContent key={state} {...props} games={gamesByState[index]} />
      ))}
    </div>
  );
};
