import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  id: number;
};

export const deleteTeams = ({ id }: Request) => {
  return fetcher.delete<void>(`teams/${id}`, { json: null });
};

export const useDeleteTeams = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTeams,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
