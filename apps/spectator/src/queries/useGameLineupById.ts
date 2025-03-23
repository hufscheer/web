import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameLineupById } from '@/src/api/game';
import { NotFoundError } from '@/src/services/errors';

import { useGameTeamInfo } from './useGameTeamInfo';

export const useGameLineupById = (gameId: string) => {
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const query = useSuspenseQuery({
    queryKey: ['game-lineup', gameId],
    queryFn: () => getGameLineupById(gameId),
    select: (data) =>
      data.map((team) => ({
        ...team,
        ...getTeamInfo(team.gameTeamId),
      })),
  });

  if (query.data.length !== 2)
    throw new NotFoundError('해당 경기의 선수 선발명단 업데이트 전입니다.');
  if (query.error) throw query.error;

  return query;
};
