import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueTeamsPlayersPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useLeagueTeamsPlayers = (payload: LeagueTeamsPlayersPayload) =>
  useQuery(queryKeys.leagues.teamsPlayers(payload));

export const useSuspenseLeagueTeamsPlayers = (payload: LeagueTeamsPlayersPayload) =>
  useSuspenseQuery(queryKeys.leagues.teamsPlayers(payload));
