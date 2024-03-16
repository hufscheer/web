import { useSuspenseQuery } from '@tanstack/react-query';

import { getSportsList } from '@/api/league';

export default function useSports(leagueId: number | null) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['sports-list', leagueId],
    queryFn: () => (leagueId ? getSportsList(leagueId) : null),
  });

  if (error) throw error;

  return { sports: data };
}
