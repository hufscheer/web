import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useLeagueStatistics = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.statistics(payload));

export const useSuspenseLeagueStatistics = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.statistics(payload));
