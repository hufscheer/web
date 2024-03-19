import { useQuery } from '@tanstack/react-query';

import { getAllLeagues } from '@/api/league';

export const LEAGUE_QUERY_KEY = 'league';
export default function useLeagueQuery() {
  const { data, error, refetch } = useQuery({
    queryKey: [LEAGUE_QUERY_KEY],
    queryFn: getAllLeagues,
  });

  if (error) throw error;

  return { data, refetch };
}
