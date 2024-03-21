import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLeaguePlayers } from '@/api/league';
import { LeaguePlayerPayload } from '@/types/league';

import { LEAGUE_TEAM_PLAYERS_QUERY_KEY } from '../queries/useLeagueTeamPlayersQuery';

type Params = {
  teamId: number;
  payload: LeaguePlayerPayload[];
};

export default function useCreateLeaguePlayersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, payload }: Params) =>
      createLeaguePlayers(teamId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [LEAGUE_TEAM_PLAYERS_QUERY_KEY, { teamId: variables.teamId }],
      });
    },
  });
}
