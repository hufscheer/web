import { useQuery } from '@tanstack/react-query';

import { getGameInfo } from '@/api/game';

export default function useGameInfoQuery(gameId: string) {
  const { data, error } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameInfo(gameId),
  });

  if (error) throw error;

  return { data };
}
