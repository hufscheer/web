import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';

export const useLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useQuery({
    queryKey: ['leagues', payload.leagueId, 'cheer-talks', 'reported', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery({
    queryKey: ['leagues', payload.leagueId, 'cheer-talks', 'reported', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseInfiniteLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: [
      'leagues',
      payload.leagueId,
      'cheer-talks',
      'reported',
      'infinite',
      payload.size,
    ] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
