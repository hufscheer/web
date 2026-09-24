import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: number;
};

export const deleteLeagues = ({ leagueId }: Request) => {
  return fetcher.delete<void>(`leagues/${leagueId}`, { json: null });
};

export const useDeleteLeagues = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLeagues,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
