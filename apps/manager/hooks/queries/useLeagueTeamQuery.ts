import { useQuery } from '@tanstack/react-query';

import { getTeamListByLeagueId } from '@/api/team';

export const LEAGUE_TEAM_QUERY_KEY = 'leagueTeamQuery';
export default function useLeagueTeamQuery(leagueId: string) {
  const { data, error } = useQuery({
    queryKey: [LEAGUE_TEAM_QUERY_KEY, { leagueId }],
    queryFn: () => getTeamListByLeagueId(leagueId),
  });

  if (error) throw error;

  return { data };
}
