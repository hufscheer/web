import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, LeagueCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalks(payload));

export const useSuspenseLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalks(payload));

export const useSuspenseInfiniteLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.leagues.cheerTalks(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
