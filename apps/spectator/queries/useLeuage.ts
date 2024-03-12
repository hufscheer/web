import { useSuspenseQuery } from '@tanstack/react-query';

import { getLeagues } from '@/api/league';

export default function useLeague(year: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['league', year],
    queryFn: () => getLeagues(year),
  });

  if (error) throw error;

  return { leagueList: data };
}
