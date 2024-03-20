import { useQuery } from '@tanstack/react-query';

import { getLeagueTeamPlayers } from '@/api/league';

export const LEAGUE_TEAM_PLAYERS_QUERY_KEY = 'leagueTeamPlayersQuery';
export default function useLeagueTeamPlayersQuery(teamId: string) {
  const { data, error } = useQuery({
    queryKey: [LEAGUE_TEAM_PLAYERS_QUERY_KEY, { teamId }],
    queryFn: () => getLeagueTeamPlayers(teamId),
  });

  if (error) throw error;

  return { data };
}
