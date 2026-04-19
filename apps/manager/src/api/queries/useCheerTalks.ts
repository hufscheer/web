import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkPayload, CheerTalkType } from '~/api';

import { queryKeys } from '../queryKey';

export const useCheerTalks = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.list(payload));

export const useSuspenseCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.list(payload));

export const useSuspenseInfiniteCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.cheertalks.list(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
