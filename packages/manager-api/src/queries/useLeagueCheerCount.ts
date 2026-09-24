import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useLeagueCheerCount = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.cheerCount(payload));

export const useSuspenseLeagueCheerCount = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerCount(payload));
