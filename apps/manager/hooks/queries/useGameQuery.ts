import { useQuery } from '@tanstack/react-query';

import { getGameList } from '@/api/league';
import { GameState, LeagueType } from '@/types/league';

export default function useGameQuery(league: LeagueType, state: GameState) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['game', league.leagueId, state, league.name],
    queryFn: () =>
      getGameList({
        league_id: league.leagueId,
        state: state,
        leagueName: league.name,
      }),
  });

  if (error) throw error;

  return { data, refetch, isLoading };
}
