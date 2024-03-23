import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameVideoById } from '@/api/game';

export const VIDEO_QUERY_KEY = 'game-video';
export const useVideoQuery = (gameId: string) => {
  const query = useSuspenseQuery({
    queryKey: [VIDEO_QUERY_KEY, { gameId }],
    queryFn: () => getGameVideoById(gameId),
  });

  if (query.error) throw query.error;

  return query;
};
