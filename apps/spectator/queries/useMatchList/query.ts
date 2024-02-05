import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchList, MatchListParams } from '@/api/match';

export const useMatchList = ({
  sport_id,
  status = 'playing',
  league_id,
}: Omit<MatchListParams, 'cursor' | 'size'>) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['match-list', sport_id, status, league_id],
    queryFn: () =>
      getMatchList({
        sport_id,
        status,
        league_id,
      }),
  });

  return {
    matchList: data,
    error,
  };
};
