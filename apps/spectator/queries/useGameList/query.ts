import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameList, GameListParams } from '@/api/game';

export const useGameList = ({
  sport_id,
  status = 'playing',
  league_id,
}: Omit<GameListParams, 'cursor' | 'size'>) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['game-list', sport_id, status, league_id],
    queryFn: () =>
      getGameList({
        sport_id,
        status,
        league_id,
      }),
  });

  return {
    gameList: data,
    error,
  };
};
