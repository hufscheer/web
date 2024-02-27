import { useSuspenseQueries } from '@tanstack/react-query';

import { getGameById, getGameCheerById } from '@/api/game';
import { GameType } from '@/types/game';

export const useCheerVSById = (gameId: string) => {
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

  if (cheersError) throw cheersError;
  if (gameTeamsError) throw gameTeamsError;

  const firstTeam = { ...cheers[0], ...gameTeams[0] };
  const secondTeam = { ...cheers[1], ...gameTeams[1] };

  return {
    firstTeam,
    secondTeam,
  };
};
