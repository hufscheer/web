import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

import type { TeamFormType } from './useCreateTeams';

type Request = {
  id: number;
} & Omit<TeamFormType, 'logoImageUrl'> & {
    logoImageUrl: TeamFormType['logoImageUrl'] | null;
  };

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
