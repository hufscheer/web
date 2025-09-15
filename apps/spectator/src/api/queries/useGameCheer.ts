import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { GameCheerPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGameCheer = (payload: GameCheerPayload) => useQuery(queryKeys.games.cheer(payload));

export const useSuspenseGameCheer = (payload: GameCheerPayload) =>
  useSuspenseQuery(queryKeys.games.cheer(payload));
