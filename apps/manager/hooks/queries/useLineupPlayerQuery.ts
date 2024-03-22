import { useQuery } from '@tanstack/react-query';

import { getPlayersByTeamId } from '@/api/league';

export const LINEUPED_PLAYER_QUERY_KEY = 'lineupedPlayer';
export default function useLineupPlayerQuery(teamId: string) {
  const query = useQuery({
    queryKey: [LINEUPED_PLAYER_QUERY_KEY, teamId],
    queryFn: () => getPlayersByTeamId(teamId),
  });

  if (query.error) throw query.error;

  return query;
}
