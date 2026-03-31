import { useMutation, useQueryClient } from '@hcc/api-base';

import type { TeamPlayer } from '~/api';

import { fetcher, queryKeys } from '~/api/queryKey';

type Request = {
  teamId: number;
  teamPlayers: TeamPlayer[];
};

export const postTeamPlayers = ({ teamId, teamPlayers }: Request) => {
  return fetcher.post<void>(`teams/${teamId}/players`, { json: teamPlayers });
};

export const useUpdateTeamPlayers = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTeamPlayers,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams.teamplayers._def });
    },
  });
};
