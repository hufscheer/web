'use client';

import { colors, Typography } from '@hcc/ui';
import { type GameStateType, useSuspenseGames } from '~/api';
import { GameCard } from '../../../_components/game-card';

type Props = {
  id: number;
  state: GameStateType;
};

export const GameList = ({ id, state }: Props) => {
  const { data } = useSuspenseGames({ league_id: id, state, size: 100 });

  if (data.length === 0)
    return (
      <Typography
        className="p-5 text-center"
        color={colors.neutral500}
        fontSize={14}
        weight="medium"
        lineHeight="none"
      >
        경기 데이터가 없어요.
      </Typography>
    );

  const games = data[0].games;

  return (
    <div>
      <div className="px-5 py-4">
        <Typography weight="semibold" lineHeight="none">
          {state === 'PLAYING' ? '진행 중' : state === 'FINISHED' ? '종료' : '예정'}
        </Typography>
      </div>

      {games.map(game => (
        <GameCard key={game.id}>
          <GameCard.Header {...game} />
          <GameCard.TeamGroup>
            {game.gameTeams.map(team => (
              <GameCard.Team key={team.gameTeamId} {...team} />
            ))}
          </GameCard.TeamGroup>
          <GameCard.Menu leagueId={id} id={game.id} />
        </GameCard>
      ))}
    </div>
  );
};
