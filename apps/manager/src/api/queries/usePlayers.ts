import { useSuspenseInfiniteQuery, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { PlayerListPayload, PlayerListResponse } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

export const usePlayers = () => useQuery(queryKeys.players.list);

export const useSuspensePlayers = () => useSuspenseQuery(queryKeys.players.list);

export const useSuspenseInfinitePlayers = (payload: PlayerListPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.players.infinite(payload).queryKey,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetcher.get<PlayerListResponse>('players', {
        searchParams: {
          cursor: pageParam > 0 ? pageParam : '',
          size: payload.size,
          name: payload.name,
          studentNumber: payload.studentNumber,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PlayerListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => data.pages.flatMap((page) => page.content),
  });
