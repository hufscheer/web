import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameById } from '@/api/game';

export const QUERY_KEY = {
  GAME_DETAIL: 'GAME_DETAIL',
};

export default function useGameById(gameId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: [QUERY_KEY.GAME_DETAIL, gameId],
    queryFn: () => getGameById(gameId),
  });

  if (error) throw error;

  return {
    gameDetail: data,
  };
}
