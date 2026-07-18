import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueRecentGamesPayload } from '~/api/types';

import { queryKeys } from '../queryKey';

export const useLeagueRecentGame = (payload?: LeagueRecentGamesPayload) =>
  useQuery(queryKeys.leagues.recentGames(payload));

export const useSuspenseLeagueRecentGames = (payload?: LeagueRecentGamesPayload) =>
  useSuspenseQuery(queryKeys.leagues.recentGames(payload));

export const fetchLeagueRecentGames = async (payload?: LeagueRecentGamesPayload) =>
  await getQueryClient().fetchQuery(queryKeys.leagues.recentGames(payload));
