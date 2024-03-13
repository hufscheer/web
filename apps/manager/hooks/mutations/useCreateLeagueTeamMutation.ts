import { useMutation } from '@tanstack/react-query';

import { createLeagueTeam } from '@/api/league';
import { LeagueTeamPayload } from '@/types/league';

type Params = {
  leagueId: number;
  payload: LeagueTeamPayload;
};

export default function useCreateLeagueTeamMutation() {
  return useMutation({
    mutationFn: ({ leagueId, payload }: Params) =>
      createLeagueTeam(leagueId, payload),
  });
}
