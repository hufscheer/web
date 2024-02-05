import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchTimelineById } from '@/api/match';

export const useMatchTimelineById = (matchId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['match-timeline', matchId],
    queryFn: () => getMatchTimelineById(matchId),
  });

  return {
    timeline: data,
    error,
  };
};
