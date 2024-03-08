import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameCheerById } from '@/api/game';

import useGameById from './useGameById';

export const useCheerVSById = (gameId: string) => {
  const { gameDetail } = useGameById(gameId);
  const { data, error } = useSuspenseQuery({
    queryKey: ['game-cheer', gameId],
    queryFn: () => getGameCheerById(gameId),
  });

  if (error) throw error;

  const gameTeams = gameDetail.gameTeams;

  const firstTeam = { ...data[0], ...gameTeams[0] };
  const secondTeam = { ...data[1], ...gameTeams[1] };

  return {
    firstTeam,
    secondTeam,
  };
};
