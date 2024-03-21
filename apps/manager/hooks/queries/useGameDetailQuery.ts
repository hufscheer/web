import { useQuery } from '@tanstack/react-query';

import { getGameDetail } from '@/api/game';

export const GAME_DETAIL_QUERY_KEY = 'gameDetail';
export default function useGameDetailQuery(gameId: string) {
  const query = useQuery({
    queryKey: [GAME_DETAIL_QUERY_KEY, { gameId }],
    queryFn: () => getGameDetail(gameId),
  });

  if (query.error) throw query.error;

  return query;
}
