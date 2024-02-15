import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameTimelineById } from '@/api/game';

export const useGameTimelineById = (gameId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['game-timeline', gameId],
    queryFn: () => getGameTimelineById(gameId),
  });

  return {
    timeline: data,
    error,
  };
};
