import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchVideoById } from '@/api/match';

export const useMatchVideoById = (matchId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['match-video', matchId],
    queryFn: () => getMatchVideoById(matchId),
  });

  return {
    videoId: data,
    error,
  };
};
