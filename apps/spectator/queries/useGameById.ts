import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameById } from '@/api/game';

const GAME_DETAIL_POLLING_INTERVAL = 1000 * 60;
export const GAME_DETAIL_QUERY_KEY = 'GAME_DETAIL';
export default function useGameById(
  gameId: string,
  interval = GAME_DETAIL_POLLING_INTERVAL,
) {
  const { data, error } = useSuspenseQuery({
    queryKey: [GAME_DETAIL_QUERY_KEY, gameId],
    queryFn: () => getGameById(gameId),

    // refetch options
    refetchInterval: interval,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60,
  });

  if (error) throw error;

  return {
    gameDetail: data,
  };
}
