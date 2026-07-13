import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameLineupPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGameQuarterScores = (payload: GameLineupPayload) =>
  useQuery(queryKeys.games.quarterScores(payload));

export const useSuspenseGameQuarterScores = (payload: GameLineupPayload) =>
  useSuspenseQuery(queryKeys.games.quarterScores(payload));
