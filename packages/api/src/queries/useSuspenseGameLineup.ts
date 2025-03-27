import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useSuspenseGameLineup = (gameId: string) =>
  useSuspenseQuery(queryKeys.gameLineup(gameId));
