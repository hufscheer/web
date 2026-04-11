import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { SportType } from '~/api/types';

import { queryKeys } from '../queryKey';

export const useLeagueRecentGame = (payload?: { sportType?: SportType }) =>
  useQuery(queryKeys.leagues.recentGames(payload));

export const useSuspenseLeagueRecentGames = (payload?: { sportType?: SportType }) =>
  useSuspenseQuery(queryKeys.leagues.recentGames(payload));

export const fetchLeagueRecentGames = async (payload?: { sportType?: SportType }) =>
  await getQueryClient().fetchQuery(queryKeys.leagues.recentGames(payload));
