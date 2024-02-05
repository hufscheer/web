import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchById } from '@/api/match';

export const QUERY_KEY = {
  MATCH_DETAIL: 'MATCH_DETAL',
};

export default function useMatchById(matchId: string) {
  const { data, error } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MATCH_DETAIL, matchId],
    queryFn: () => getMatchById(matchId),
  });

  return {
    matchDetail: data,
    error,
  };
}
