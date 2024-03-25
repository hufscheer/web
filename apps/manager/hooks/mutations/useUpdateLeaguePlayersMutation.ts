import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLeaguePlayers } from '@/api/league';
import { LEAGUE_TEAM_PLAYERS_QUERY_KEY } from '@/hooks/queries/useLeagueTeamPlayersQuery';
import { LeaguePlayerPayload } from '@/types/league';

export default function useUpdateLeaguePlayersMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: {
      teamPlayerId: string;
      payload: LeaguePlayerPayload;
    }) => updateLeaguePlayers(variables.teamPlayerId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LEAGUE_TEAM_PLAYERS_QUERY_KEY],
      });
    },
  });
}
