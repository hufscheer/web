import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameLineupById } from '@/api/game';

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

  if (query.error) throw query.error;

  return query;
};
