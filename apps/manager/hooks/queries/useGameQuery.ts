import { useQuery } from '@tanstack/react-query';

import { getGameList } from '@/api/league';
import { StateType } from '@/types/game';
import { LeagueType } from '@/types/league';

export const GAME_QUERY_KEY = 'game';
export default function useGameQuery(league: LeagueType, state: StateType) {
  const { data, error, isLoading, refetch } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [GAME_QUERY_KEY, { state, leagueId: league.leagueId }],
    queryFn: () =>
      getGameList({
        state,
        league_id: league.leagueId,
        leagueName: league.name,
      }),
  });

  if (error) throw error;

  return { data, refetch, isLoading };
}
