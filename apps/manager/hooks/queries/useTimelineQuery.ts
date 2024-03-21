import { useQuery } from '@tanstack/react-query';

import { getGameTimeline } from '@/api/game';

export const TIMELINE_QUERY_KEY = 'game-timeline';
export const useTimelineQuery = (gameId: string) => {
  const query = useQuery({
    queryKey: [TIMELINE_QUERY_KEY, { gameId }],
    queryFn: () => getGameTimeline(gameId),
  });

  if (query.error) throw query.error;

  return query;
};
