import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';
import type { GameListPayload } from '../types';

export const useGames = (payload: GameListPayload) => useQuery(queryKeys.games.list(payload));

export const useSuspenseGames = (payload: GameListPayload) =>
  useSuspenseQuery(queryKeys.games.list(payload));
