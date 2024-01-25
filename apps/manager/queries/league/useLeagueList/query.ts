import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllLeagues } from '@/api/league';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function useLeagueList() {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.LEAGUE_LIST],
    queryFn: () => getAllLeagues(),
  });

  return {
    data,
    error,
  };
}
