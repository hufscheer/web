import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useLeagueBracket = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.bracket(payload));

export const useSuspenseLeagueBracket = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.bracket(payload));
