import { useSuspenseQueries } from '@tanstack/react-query';

import { getMatchById, getMatchCheerById } from '@/api/match';
import { MatchType } from '@/types/match';

export const useMatchCheerById = (matchId: string) => {
  const [
    { data: cheers, error: cheersError },
    { data: matchTeams, error: matchTeamsError },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['match-cheer', matchId],
        queryFn: () => getMatchCheerById(matchId),
      },
      {
        queryKey: ['match-detail', 'for-cheer', matchId],
        queryFn: () => getMatchById(matchId),
        select: (data: MatchType) => data.gameTeams,
      },
    ],
  });

  return {
    cheers,
    matchTeams,
    cheersError,
    matchTeamsError,
  };
};
