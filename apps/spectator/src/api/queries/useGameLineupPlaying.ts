import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameLineupPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGameLineupPlaying = (payload: GameLineupPayload) =>
  useQuery(queryKeys.games.lineupPlaying(payload));

export const useSuspenseGameLineupPlaying = (payload: GameLineupPayload) =>
  useSuspenseQuery(queryKeys.games.lineupPlaying(payload));
