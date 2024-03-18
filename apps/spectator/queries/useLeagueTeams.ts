import { useQuery } from '@tanstack/react-query';

import { getLeagueTeams } from '@/api/league';
import getQueryClient from '@/app/getQueryClient';

export const LEAGUE_TEAMS_QUERY_KEY = 'league-teams';
export default function useLeagueTeams(leagueId: number) {
  const { data, error } = useQuery({
    queryKey: [LEAGUE_TEAMS_QUERY_KEY, { leagueId }],
    queryFn: () => getLeagueTeams(leagueId),
  });

  if (error) throw error;

  return { leagueTeams: data };
}

export async function useLeagueTeamsPrefetch(leagueId: number | undefined) {
  if (!leagueId) return;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [LEAGUE_TEAMS_QUERY_KEY, { leagueId }],
    queryFn: () => getLeagueTeams(leagueId),
  });
}
