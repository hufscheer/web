import { useSuspenseInfiniteQuery, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { PlayerType } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

const PLAYERS_PAGE_SIZE = 20;

export const usePlayers = () => useQuery(queryKeys.players.list);

export const useSuspensePlayers = () => useSuspenseQuery(queryKeys.players.list);

export const useSuspenseInfinitePlayers = () =>
  useSuspenseInfiniteQuery({
    queryKey: ['players', 'infinite'] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetcher.get<PlayerType[]>('players', {
        searchParams: { cursor: pageParam || '', size: PLAYERS_PAGE_SIZE },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PlayerType[]) =>
      lastPage.length === PLAYERS_PAGE_SIZE
        ? (lastPage[lastPage.length - 1]?.playerId ?? null)
        : null,
  });
