import { useQuery } from '@tanstack/react-query';

import { getLineup } from '@/api/game';

export default function useGameLineupQuery(teamId: string) {
  const query = useQuery({
    queryKey: ['gameLineup', { teamId }],
    queryFn: () => getLineup(teamId),
  });

  if (query.error) throw query.error;

  return query;
}
