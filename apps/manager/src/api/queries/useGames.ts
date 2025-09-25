import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { GameListPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGames = (payload: GameListPayload) => useQuery(queryKeys.games.list(payload));

export const useSuspenseGames = (payload: GameListPayload) =>
  useSuspenseQuery(queryKeys.games.list(payload));
