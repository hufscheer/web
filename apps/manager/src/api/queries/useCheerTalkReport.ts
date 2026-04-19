import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkPayload, CheerTalkType } from '~/api';

import { queryKeys } from '../queryKey';

export const useCheerTalkReport = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.reported(payload));

export const useSuspenseCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.reported(payload));

export const useSuspenseInfiniteCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.cheertalks.reported(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
