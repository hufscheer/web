import { useSuspenseInfiniteQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, GameCheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';

export const useSuspenseInfiniteGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['games', payload.gameId, 'cheer-talks', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`games/${payload.gameId}/cheer-talks`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
