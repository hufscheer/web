import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { CheerTalkPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useCheerTalkBlock = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.blocked(payload));

export const useSuspenseCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.blocked(payload));
