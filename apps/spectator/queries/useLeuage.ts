import { useSuspenseQuery } from '@tanstack/react-query';

import { getLeagues } from '@/api/league';

export default function useLeague(year: number | null) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['league', year],
    queryFn: () => (year ? getLeagues(year) : null),
  });

  if (error) throw error;

  return { leagues: data };
}
