import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { LeagueStatisticsPayload, LeagueTopScorersPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useLeagueTopScorers = (payload: LeagueTopScorersPayload) =>
  useQuery(queryKeys.leagues.topScorers(payload));

export const useSuspenseLeagueTopScorers = (payload: LeagueTopScorersPayload) =>
  useSuspenseQuery(queryKeys.leagues.topScorers(payload));
