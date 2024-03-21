import { useQuery } from '@tanstack/react-query';

import { getLineup } from '@/api/game';

export const GAME_LINEUP_QUERY_KEY = 'gameLineup';
export default function useGameLineupQuery(teamId: string) {
  const query = useQuery({
    queryKey: [GAME_LINEUP_QUERY_KEY, { teamId }],
    queryFn: () => getLineup(teamId),
  });

  if (query.error) throw query.error;

  return query;
}
