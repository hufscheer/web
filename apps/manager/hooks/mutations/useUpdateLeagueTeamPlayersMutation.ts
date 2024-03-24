import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLeagueTeamPlayers } from '@/api/league';
import { LEAGUE_TEAM_PLAYERS_QUERY_KEY } from '@/hooks/queries/useLeagueTeamPlayersQuery';
import { LeaguePlayerPayload } from '@/types/league';

export default function useUpdateLeagueTeamPlayersMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: {
      teamPlayerId: string;
      payload: LeaguePlayerPayload;
    }) => updateLeagueTeamPlayers(variables.teamPlayerId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LEAGUE_TEAM_PLAYERS_QUERY_KEY],
      });
    },
  });
}
