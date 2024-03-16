import { useSuspenseQuery } from '@tanstack/react-query';

import { getSports } from '@/api/league';

export default function useSports(leagueId: number | null) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['sports-list', leagueId],
    queryFn: () => (leagueId ? getSports(leagueId) : null),
  });

  if (error) throw error;

  return { sports: data };
}
