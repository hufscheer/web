import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '~/api/types';

import { queryKeys } from '~/api/queryKey';

export const useLeagueStatistics = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.statistics(payload));

export const useSuspenseLeagueStatistics = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.statistics(payload));
