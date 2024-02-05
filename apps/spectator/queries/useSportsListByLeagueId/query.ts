import { useSuspenseQuery } from '@tanstack/react-query';

import { getSportsListByLeagueId } from '@/api/league';

export default function useSportsListByLeagueId(leagueId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: ['sports-list', leagueId],
    queryFn: () => getSportsListByLeagueId(leagueId),
  });

  return {
    sportsList: data,
    error,
  };
}
