import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';
import type { CheerTalkPayload } from '../types';

export const useCheerTalkBlock = (payload: CheerTalkPayload) =>
  useQuery(queryKeys['cheer-talks'].blocked(payload));

export const useSuspenseCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys['cheer-talks'].blocked(payload));
