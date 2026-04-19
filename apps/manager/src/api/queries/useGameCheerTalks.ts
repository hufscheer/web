import { useSuspenseInfiniteQuery } from '@hcc/api-base';

import type { CheerTalkType, GameCheerTalkPayload } from '~/api';

import { fetcher } from '../queryKey';

export const useSuspenseInfiniteGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['games', payload.gameId, 'cheer-talks', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks`, {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
