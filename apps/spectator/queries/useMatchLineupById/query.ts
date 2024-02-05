import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchLineupById } from '@/api/match';

export const useMatchLineupById = (matchId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['match-lineup', matchId],
    queryFn: () => getMatchLineupById(matchId),
  });

  return {
    lineup: data,
    error,
  };
};
