import { useSuspenseQuery } from '@hcc/api-base';

import type { TimelinePayload } from '~/api/types';

import { queryKeys } from '../queryKey';

export const useSuspenseGameTimelineProgressAvailable = (payload: TimelinePayload) =>
  useSuspenseQuery(queryKeys.games.progressAvailable(payload));
