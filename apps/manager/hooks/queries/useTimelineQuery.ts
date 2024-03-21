import { useQuery } from '@tanstack/react-query';

import { getGameTimeline } from '@/api/game';

export const useTimelineQuery = (gameId: string) => {
  const query = useQuery({
    queryKey: ['game-timeline', gameId],
    queryFn: () => getGameTimeline(gameId),
  });

  if (query.error) throw query.error;

  return query;
};
