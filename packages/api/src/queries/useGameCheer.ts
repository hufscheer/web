import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { useGame } from './useGame';
import { GameTeamType } from '../types';

export const useGameCheer = (gameId: string) => {
  const { data: game } = useGame(gameId);
  const { data: cheer } = useSuspenseQuery(queryKeys.gameCheer(gameId));

  if (!game || !cheer) throw new Error('Game or Cheer is not found');

  const gameTeams: GameTeamType[] = game.gameTeams;

  const homeTeam = { ...cheer[0], ...gameTeams[0] };
  const awayTeam = { ...cheer[1], ...gameTeams[1] };

  return { homeTeam, awayTeam };
};
