import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, GameCheerTalkPayload } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

export const useGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalksBlocked(payload));

export const useSuspenseGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalksBlocked(payload));

export const useSuspenseInfiniteGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: [
      'games',
      payload.gameId,
      'cheer-talks',
      'blocked',
      'infinite',
      payload.size,
    ] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/blocked`, {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
