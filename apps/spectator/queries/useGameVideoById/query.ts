import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameVideoById } from '@/api/game';

export const useGameVideoById = (gameId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['game-video', gameId],
    queryFn: () => getGameVideoById(gameId),
  });

  return {
    videoId: data,
    error,
  };
};
