import { useSuspenseInfiniteQuery, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { PlayerListResponse } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

const PLAYERS_PAGE_SIZE = 20;

export const usePlayers = () => useQuery(queryKeys.players.list);

export const useSuspensePlayers = () => useSuspenseQuery(queryKeys.players.list);

export const useSuspenseInfinitePlayers = (options?: { name?: string }) =>
  useSuspenseInfiniteQuery({
    queryKey: ['players', 'infinite', options?.name ?? ''] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetcher.get<PlayerListResponse>('players', {
        searchParams: {
          cursor: pageParam > 0 ? pageParam : '',
          size: PLAYERS_PAGE_SIZE,
          ...(options?.name ? { name: options.name } : {}),
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PlayerListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => data.pages.flatMap((page) => page.content),
  });
