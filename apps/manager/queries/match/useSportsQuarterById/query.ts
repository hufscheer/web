import { useSuspenseQuery } from '@tanstack/react-query';

import { getSportsQuarterById } from '@/api/match';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function useSportsQuarterById(sportsId: number) {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.SPORTS_QUARTER, sportsId],
    queryFn: () => getSportsQuarterById(sportsId),
  });

  return {
    sportsQuarter: data,
    error,
  };
}
