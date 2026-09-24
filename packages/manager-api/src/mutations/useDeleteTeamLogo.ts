import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  id: number;
};

export const postDeleteTeamLogo = ({ id }: Request) => {
  return fetcher.post<void>(`teams/${id}/delete-logo`);
};

export const useDeleteTeamLogo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postDeleteTeamLogo,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
