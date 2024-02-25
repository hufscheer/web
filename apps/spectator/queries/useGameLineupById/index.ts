import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameLineupById } from '@/api/game';

export const useGameLineupById = (gameId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['game-lineup', gameId],
    queryFn: () => getGameLineupById(gameId),
  });

  return {
    lineup: data,
    error,
  };
};
