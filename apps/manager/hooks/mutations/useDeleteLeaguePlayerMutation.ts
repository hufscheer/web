import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeaguePlayers } from '@/api/league';
import { LEAGUE_TEAM_PLAYERS_QUERY_KEY } from '@/hooks/queries/useLeagueTeamPlayersQuery';

export default function useDeleteLeaguePlayerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLeaguePlayers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LEAGUE_TEAM_PLAYERS_QUERY_KEY],
      });
    },
  });
}
