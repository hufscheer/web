import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useLeagueTopScorers = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.topScorers(payload));

export const useSuspenseLeagueTopScorers = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.topScorers(payload));
