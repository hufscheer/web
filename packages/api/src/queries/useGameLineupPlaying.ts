import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGameLineupPlaying = (gameId: string) =>
  useQuery(queryKeys.gameLineupPlaying(gameId));
