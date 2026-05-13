import { useSuspenseInfiniteQuery, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { PlayerListResponse } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

const PLAYERS_PAGE_SIZE = 20;

export const usePlayers = () => useQuery(queryKeys.players.list);

export const useSuspensePlayers = () => useSuspenseQuery(queryKeys.players.list);

export const useSuspenseInfinitePlayers = () =>
  useSuspenseInfiniteQuery({
    queryKey: ['players', 'infinite'] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetcher.get<PlayerListResponse>('players', {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: PLAYERS_PAGE_SIZE },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PlayerListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
  });
