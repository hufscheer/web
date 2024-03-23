import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameLineupById } from '@/api/game';
import { NotFoundError } from '@/services/errors';

import { useGameTeamInfo } from './useGameTeamInfo';

export const useGameLineupById = (gameId: string) => {
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const query = useSuspenseQuery({
    queryKey: ['game-lineup', gameId],
    queryFn: () => getGameLineupById(gameId),
    select: data =>
      data.map(team => ({
        ...team,
        ...getTeamInfo(team.gameTeamId),
      })),
  });

  if (query.data.length !== 2)
    throw new NotFoundError('라인업이 등록되지 않았습니다.');
  if (query.error) throw query.error;

  return query;
};
