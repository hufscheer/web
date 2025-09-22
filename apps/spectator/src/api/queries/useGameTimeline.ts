import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { TimelinePayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGameTimeline = (payload: TimelinePayload) =>
  useQuery(queryKeys.games.timeline(payload));

export const useSuspenseGameTimeline = (payload: TimelinePayload) =>
  useSuspenseQuery(queryKeys.games.timeline(payload));
