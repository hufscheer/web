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

  return (
    <div>
      <div className="border-neutral-50 border-b bg-white px-5 py-4">
        <Typography weight="semibold" lineHeight="none">
          {state === 'PLAYING' ? '진행 중' : state === 'FINISHED' ? '종료' : '예정'}
        </Typography>
      </div>

      {data.length > 0 && data[0]?.games?.length > 0 ? (
        data[0].games.map((game) => (
          <GameCard key={game.id}>
            <GameCard.Header {...game} leagueId={id} />
            <GameCard.TeamGroup>
              {game.gameTeams.map((team) => (
                <GameCard.Team key={team.gameTeamId} {...team} />
              ))}
            </GameCard.TeamGroup>
            <GameCard.Menu leagueId={id} id={game.id} />
          </GameCard>
        ))
      ) : (
        <Typography
          className="bg-white p-5 text-center"
          color={colors.neutral500}
          fontSize={14}
          weight="medium"
          lineHeight="none"
        >
          경기 데이터가 없어요.
        </Typography>
      )}
    </div>
  );
};

export const GameListError = () => {
  return (
    <Typography
      className="bg-white p-5 text-center"
      color={colors.neutral500}
      fontSize={14}
      weight="medium"
      lineHeight="none"
    >
      경기 데이터를 불러오는 중에 오류가 발생했어요.
    </Typography>
  );
};
