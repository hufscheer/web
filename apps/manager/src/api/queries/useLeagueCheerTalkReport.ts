import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { fetcher } from '../queryKey';

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
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
