import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';
import type { CheerTalkPayload } from '../types';

export const useCheerTalks = (payload: CheerTalkPayload) =>
  useQuery(queryKeys['cheer-talks'].list(payload));

export const useSuspenseCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys['cheer-talks'].list(payload));
