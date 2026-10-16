import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '~/api/types';

import { queryKeys } from '~/api/queryKey';

export const useLeagueCheerCount = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.cheerCount(payload));

export const useSuspenseLeagueCheerCount = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerCount(payload));
