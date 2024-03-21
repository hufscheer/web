import { useQuery } from '@tanstack/react-query';

import { getQuarters } from '@/api/game';

export default function useGameQuarterQuery(gameId: string) {
  const query = useQuery({
    queryKey: ['gameQuarter', { gameId }],
    queryFn: () => getQuarters(gameId),
  });

  if (query.error) throw query.error;

  return query;
}
