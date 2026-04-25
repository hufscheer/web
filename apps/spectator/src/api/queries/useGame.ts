import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameDetailPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGame = (payload: GameDetailPayload) => useQuery(queryKeys.games.detail(payload));

export const useSuspenseGame = (payload: GameDetailPayload) =>
  useSuspenseQuery(queryKeys.games.detail(payload));

export const fetchGame = async (payload: GameDetailPayload) =>
  await getQueryClient().fetchQuery(queryKeys.games.detail(payload));
