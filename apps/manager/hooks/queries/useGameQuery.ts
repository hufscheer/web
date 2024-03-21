import { useQuery } from '@tanstack/react-query';

import { getGameList } from '@/api/league';
import { StateType } from '@/types/game';
import { LeagueType } from '@/types/league';

export default function useGameQuery(league: LeagueType, state: StateType) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['game', { state, ...league }],
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
