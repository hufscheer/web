import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { fetcher, queryKeys } from '../queryKey';

export const useLeagueCheerTalkBlock = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalksBlocked(payload));

export const useSuspenseLeagueCheerTalkBlock = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalksBlocked(payload));

export const useSuspenseInfiniteLeagueCheerTalkBlock = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: [
      'leagues',
      payload.leagueId,
      'cheer-talks',
      'blocked',
      'infinite',
      payload.size,
    ] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/blocked`, {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
