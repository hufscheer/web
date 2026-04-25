import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkPayload, CheerTalkType } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

export const useCheerTalkBlock = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.blocked(payload));

export const useSuspenseCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.blocked(payload));

export const useSuspenseInfiniteCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['cheertalks', 'blocked', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>('cheer-talks/blocked', {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
