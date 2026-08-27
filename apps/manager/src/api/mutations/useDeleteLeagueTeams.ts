import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
  teamIds: number[];
};

export const deleteLeagueTeams = ({ leagueId, teamIds }: Request) => {
  return fetcher.delete<void>(`leagues/${leagueId}/teams`, { json: { teamIds } });
};

export const useDeleteLeagueTeams = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLeagueTeams,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
