import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkPayload } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

export const useCheerTalkBlock = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.blocked(payload));

export const useSuspenseCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.blocked(payload));

export const useSuspenseInfiniteCheerTalkBlock = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.cheertalks.blockedInfinite(payload.size).queryKey,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>('cheer-talks/blocked', {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
