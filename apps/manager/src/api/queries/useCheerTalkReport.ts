import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';
import type { CheerTalkPayload } from '../types';

export const useCheerTalkReport = (payload: CheerTalkPayload) =>
  useQuery(queryKeys['cheer-talks'].reported(payload));

export const useSuspenseCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys['cheer-talks'].reported(payload));
