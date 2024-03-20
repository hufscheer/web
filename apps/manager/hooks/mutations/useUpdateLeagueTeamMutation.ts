import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLeagueTeam } from '@/api/league';
import { LEAGUE_TEAM_QUERY_KEY } from '@/hooks/queries/useLeagueTeamQuery';

export default function useUpdateLeagueTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { teamId: string; payload: FormData }) =>
      updateLeagueTeam(variables.teamId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAGUE_TEAM_QUERY_KEY] });
    },
  });
}
