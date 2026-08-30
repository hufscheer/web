import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, GameCheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

export const useGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalksBlocked(payload));

export const useSuspenseGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalksBlocked(payload));

export const useSuspenseInfiniteGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.games.cheerTalksBlockedInfinite(payload).queryKey,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`games/${payload.gameId}/cheer-talks/blocked`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
