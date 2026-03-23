import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueCheerCountPayload, LeagueCheerCountType } from '../types';

import { queryKeys } from '../queryKey';

type LeagueCheerCountQueryKey = ReturnType<typeof queryKeys.leagues.cheerTalks>['queryKey'];

export const useLeagueCheerCount = <TData = unknown, TError = unknown>(
  payload: LeagueCheerCountPayload,
  options?: Omit<
    Parameters<typeof useQuery<LeagueCheerCountType, TError, TData, LeagueCheerCountQueryKey>>[0],
    'queryKey' | 'queryFn'
  >,
) => {
  const { queryKey, queryFn } = queryKeys.leagues.cheerTalks(payload);

  return useQuery<LeagueCheerCountType, TError, TData, LeagueCheerCountQueryKey>({
    ...options,
    queryKey,
    queryFn,
  });
};

export const useSuspenseLeagueCheerCount = <TData = LeagueCheerCountType, TError = unknown>(
  payload: LeagueCheerCountPayload,
  options?: Omit<
    Parameters<
      typeof useSuspenseQuery<LeagueCheerCountType, TError, TData, LeagueCheerCountQueryKey>
    >[0],
    'queryKey' | 'queryFn'
  >,
) => {
  const { queryKey, queryFn } = queryKeys.leagues.cheerTalks(payload);

  return useSuspenseQuery<LeagueCheerCountType, TError, TData, LeagueCheerCountQueryKey>({
    ...options,
    queryKey,
    queryFn,
  });
};
