import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { GameSearchPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGameSearch = (payload: GameSearchPayload) =>
  useQuery(queryKeys.games.search(payload));

export const useSuspenseGameSearch = (payload: GameSearchPayload) =>
  useSuspenseQuery(queryKeys.games.search(payload));
