import { useMutation } from '@tanstack/react-query';

import { createLeaguePlayers } from '@/api/league';
import { LeaguePlayerPayload } from '@/types/league';

type Params = {
  teamId: number;
  payload: LeaguePlayerPayload[];
};

export default function useCreateLeaguePlayersMutation() {
  return useMutation({
    mutationFn: ({ teamId, payload }: Params) =>
      createLeaguePlayers(teamId, payload),
  });
}
