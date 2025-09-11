import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { LeagueStatisticsPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useLeagueStatistics = (payload: LeagueStatisticsPayload) =>
  useQuery(queryKeys.leagues.statistics(payload));

export const useSuspenseLeagueStatistics = (payload: LeagueStatisticsPayload) =>
  useSuspenseQuery(queryKeys.leagues.statistics(payload));
