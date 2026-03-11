import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameLineupPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGameLineup = (payload: GameLineupPayload) =>
  useQuery(queryKeys.games.lineup(payload));

export const useSuspenseGameLineup = (payload: GameLineupPayload) =>
  useSuspenseQuery(queryKeys.games.lineup(payload));
