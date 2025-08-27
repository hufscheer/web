import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { TeamFormType } from '~/api';
import { queryKeys } from '~/api/queryKey';

type Request = {
  id: number;
} & TeamFormType;

export const patchTeams = ({ id, ...request }: Request) => {
  return fetcher.patch<void>(`teams/${id}`, { json: request });
};

export const useUpdateTeams = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchTeams,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
