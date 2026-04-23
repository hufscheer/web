import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, GameCheerTalkPayload } from '~/api';

import { fetcher } from '../queryKey';

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
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
