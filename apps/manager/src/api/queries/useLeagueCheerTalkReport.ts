import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalksReported(payload));

export const useSuspenseLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalksReported(payload));

export const useSuspenseInfiniteLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.leagues.cheerTalksReported(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
