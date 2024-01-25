import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchInfoById } from '@/api/match';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function useMatchInfoByIdWithAuth(matchId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.MATCH_INFO, matchId],
    queryFn: () => getMatchInfoById(matchId),
  });

  return {
    matchInfo: data,
    error,
  };
}
