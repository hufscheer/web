import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { CheerTalkPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useCheerTalks = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.list(payload));

export const useSuspenseCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.list(payload));
