import { useSuspenseQuery } from '@tanstack/react-query';

import { getLeagueTeams } from '@/api/league';

export default function useLeagueTeams(leagueId: number | null) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['league-team', leagueId],
    queryFn: () => (leagueId ? getLeagueTeams(leagueId) : null),
  });

  if (error) throw error;

  return { leagueTeams: data };
}
