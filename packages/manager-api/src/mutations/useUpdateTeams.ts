import { useMutation, useQueryClient } from '@hcc/api-base';

import type { TeamFormType } from './useCreateTeams';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

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
