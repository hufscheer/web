import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGame = (gameId?: string) =>
  useSuspenseQuery(queryKeys.game(gameId));
