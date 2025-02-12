import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGameLineup = (gameId: string) =>
  useQuery(queryKeys.lineup(gameId));
