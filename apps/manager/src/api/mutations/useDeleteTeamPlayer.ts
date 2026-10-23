import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  teamPlayerId: number;
};

export const deleteTeamPlayer = ({ teamPlayerId }: Request) => {
  return fetcher.delete<void>(`team-players/${teamPlayerId}`, { json: null });
};

export const useDeleteTeamPlayer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamPlayer,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
