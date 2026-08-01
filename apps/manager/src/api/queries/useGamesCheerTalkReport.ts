import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkType, GameCheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';

export const useGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useQuery({
    queryKey: ['games', payload.gameId, 'cheer-talks', 'reported', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery({
    queryKey: ['games', payload.gameId, 'cheer-talks', 'reported', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseInfiniteGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: [
      'games',
      payload.gameId,
      'cheer-talks',
      'reported',
      'infinite',
      payload.size,
    ] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`games/${payload.gameId}/cheer-talks/reported`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
