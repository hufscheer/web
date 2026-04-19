import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkPayload, CheerTalkType } from '~/api';

import { fetcher } from '../queryKey';

export const useCheerTalks = (payload: CheerTalkPayload) =>
  useQuery({
    queryKey: ['cheertalks', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>('cheer-talks', {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseQuery({
    queryKey: ['cheertalks', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>('cheer-talks', {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseInfiniteCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['cheertalks', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>('cheer-talks', {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
