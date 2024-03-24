import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeagueTeam } from '@/api/league';
import { LEAGUE_TEAM_QUERY_KEY } from '@/hooks/queries/useLeagueTeamQuery';

export default function useDeleteLeagueTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLeagueTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAGUE_TEAM_QUERY_KEY] });
    },
  });
}
