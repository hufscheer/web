import { useSuspenseQueries } from '@tanstack/react-query';

import { getGameById, getGameCheerById } from '@/api/game';
import { GameType } from '@/types/game';

export const useGameCheerById = (gameId: string) => {
  const [
    { data: cheers, error: cheersError },
    { data: gameTeams, error: gameTeamsError },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['game-cheer', gameId],
        queryFn: () => getGameCheerById(gameId),
      },
      {
        queryKey: ['game-detail', 'for-cheer', gameId],
        queryFn: () => getGameById(gameId),
        select: (data: GameType) => data.gameTeams,
      },
    ],
  });

  return {
    cheers,
    gameTeams,
    cheersError,
    gameTeamsError,
  };
};
