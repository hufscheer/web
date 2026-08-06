import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

export const useCheerTalks = (payload: CheerTalkPayload) =>
  useQuery(queryKeys.cheertalks.list(payload));

export const useSuspenseCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseQuery(queryKeys.cheertalks.list(payload));

export const useSuspenseInfiniteCheerTalks = (payload: CheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.cheertalks.listInfinite(payload.size).queryKey,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>('cheer-talks', {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
