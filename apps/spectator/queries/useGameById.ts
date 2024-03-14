import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameById } from '@/api/game';

export const GAME_DETAIL_QUERY_KEY = 'GAME_DETAIL';
export default function useGameById(gameId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: [GAME_DETAIL_QUERY_KEY, gameId],
    queryFn: () => getGameById(gameId),
  });

  if (error) throw error;

  return {
    gameDetail: data,
  };
}
