import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { fetcher } from '../queryKey';

export const useLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useQuery({
    queryKey: ['leagues', payload.leagueId, 'cheer-talks', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery({
    queryKey: ['leagues', payload.leagueId, 'cheer-talks', payload] as const,
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  });

export const useSuspenseInfiniteLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: ['leagues', payload.leagueId, 'cheer-talks', 'infinite', payload.size] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`leagues/${payload.leagueId}/cheer-talks`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
  });
