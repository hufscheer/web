import { useQuery } from '@tanstack/react-query';

import { getGameTeams } from '@/api/game';

export const GAME_TEAMS_QUERY_KEY = 'gameTeams';
export default function useGameTeamsQuery(gameId: string) {
  const query = useQuery({
    queryKey: [GAME_TEAMS_QUERY_KEY, { gameId }],
    queryFn: () => getGameTeams(gameId),
  });

  if (query.error) throw query.error;

  return query;
}
