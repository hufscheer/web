import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameLineupById } from '@/api/game';

import useGameById from './useGameById';

export const useGameLineupById = (gameId: string) => {
  const {
    gameDetail: { gameTeams },
  } = useGameById(gameId);

  const { data, error } = useSuspenseQuery({
    queryKey: ['game-lineup', gameId],
    queryFn: () => getGameLineupById(gameId),
    select: data =>
      data.map((team, i) => {
        return {
          lineup: team.gameTeamPlayers,
          info:
            gameTeams.find(
              gameTeam => gameTeam.gameTeamId === team.gameTeamId,
            ) || gameTeams[i],
        };
      }),
  });

  return {
    data,
    error,
  };
};
