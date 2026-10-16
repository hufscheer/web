import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { TimelinePayload } from '~/api/types';

import { queryKeys } from '~/api/queryKey';

export const useGameQuarterScores = (payload: TimelinePayload) =>
  useQuery(queryKeys.games.quarterScores(payload));

export const useSuspenseGameQuarterScores = (payload: TimelinePayload) =>
  useSuspenseQuery(queryKeys.games.quarterScores(payload));
