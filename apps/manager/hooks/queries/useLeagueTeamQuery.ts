import { useQuery } from '@tanstack/react-query';

import { getTeamListByLeagueId } from '@/api/team';

export const LEAGUE_TEAM_QUERY_KEY = 'leagueTeamQuery';
export default function useLeagueTeamQuery(leagueId: string) {
  const { error } = useQuery({
    queryKey: [LEAGUE_TEAM_QUERY_KEY, { leagueId }],
    queryFn: () => getTeamListByLeagueId(leagueId),
  });

  if (error) throw error;

  return {
    data: [
      {
        id: 1,
        name: '1번 팀',
        logoImageUrl: 'string',
      },
      {
        id: 2,
        name: '2번 팀',
        logoImageUrl: 'string',
      },
    ],
  };

  // return { data };
}
