import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLeagueTeam } from '@/api/league';

import { LEAGUE_TEAM_QUERY_KEY } from '../queries/useLeagueTeamQuery';

type Params = {
  leagueId: number;
  payload: FormData;
};

export default function useCreateLeagueTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leagueId, payload }: Params) =>
      createLeagueTeam(leagueId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [LEAGUE_TEAM_QUERY_KEY, { leagueId: variables.leagueId }],
      });
    },
  });
}
