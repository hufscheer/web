import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { LeagueTeamsPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useLeagueTeams = (payload: LeagueTeamsPayload) =>
  useQuery(queryKeys.leagues.teams(payload));

export const useSuspenseLeagueTeams = (payload: LeagueTeamsPayload) =>
  useSuspenseQuery(queryKeys.leagues.teams(payload));

export const fetchLeagueTeams = async (payload: LeagueTeamsPayload) =>
  await getQueryClient().fetchQuery(queryKeys.leagues.teams(payload));
