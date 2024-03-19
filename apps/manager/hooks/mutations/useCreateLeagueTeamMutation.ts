import { useMutation } from '@tanstack/react-query';

import { createLeagueTeam } from '@/api/league';

type Params = {
  leagueId: number;
  payload: FormData;
};

export default function useCreateLeagueTeamMutation() {
  return useMutation({
    mutationFn: ({ leagueId, payload }: Params) =>
      createLeagueTeam(leagueId, payload),
  });
}
