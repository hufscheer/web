import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { LeagueTeamPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useLeagueTeams = (payload: LeagueTeamPayload) =>
  useQuery(queryKeys.leagues.teams(payload));

export const useSuspenseLeagueTeams = (payload: LeagueTeamPayload) =>
  useSuspenseQuery(queryKeys.leagues.teams(payload));
