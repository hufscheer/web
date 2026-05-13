import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkPayload } from '~/api';

import { fetcher } from '../queryKey';

export const useCheerTalkReport = (payload: CheerTalkPayload) =>
  useQuery({
    queryKey: ['cheertalks', 'reported', payload] as const,
    queryFn: () =>
      fetcher.get<CheerTalkListResponse>('cheer-talks/reported', {
        searchParams: { cursor: payload.cursor || '', size: payload.size },
      }),
  });

export const useSuspenseCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseQuery({
    queryKey: ['cheertalks', 'reported', payload] as const,
    queryFn: () =>
      fetcher.get<CheerTalkListResponse>('cheer-talks/reported', {
        searchParams: { cursor: payload.cursor || '', size: payload.size },
      }),
  });

export const useSuspenseInfiniteCheerTalkReport = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['cheertalks', 'reported', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>('cheer-talks/reported', {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
  });
