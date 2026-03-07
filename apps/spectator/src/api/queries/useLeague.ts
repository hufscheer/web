import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueDetailPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeague = (payload: LeagueDetailPayload) =>
  useQuery(queryKeys.leagues.detail(payload));

export const useSuspenseLeague = (payload: LeagueDetailPayload) =>
  useSuspenseQuery(queryKeys.leagues.detail(payload));

export const fetchLeague = async (payload: LeagueDetailPayload) =>
  await getQueryClient().fetchQuery(queryKeys.leagues.detail(payload));
