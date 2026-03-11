import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useCheerTalkReport = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.reported(payload));

export const useSuspenseCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.reported(payload));
