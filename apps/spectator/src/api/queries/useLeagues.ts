import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueListPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagues = (payload: LeagueListPayload) => useQuery(queryKeys.leagues.list(payload));

export const useSuspenseLeagues = (payload: LeagueListPayload) =>
  useSuspenseQuery(queryKeys.leagues.list(payload));
