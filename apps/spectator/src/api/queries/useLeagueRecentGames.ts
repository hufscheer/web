import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export const useLeagueRecentGame = () => useQuery(queryKeys.leagues.recentGames());

export const useSuspenseLeagueRecentGames = () => useSuspenseQuery(queryKeys.leagues.recentGames());

export const fetchLeagueRecentGames = async () =>
  await getQueryClient().fetchQuery(queryKeys.leagues.recentGames());
