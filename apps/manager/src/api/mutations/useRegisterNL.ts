import { useMutation, useQueryClient } from '@hcc/api-base';

import type { RegisterNLResponse, RegisterNLPayload } from '~/api/types/nl';

import { fetcher, queryKeys } from '~/api/queryKey';

const postRegisterNL = (payload: RegisterNLPayload) => {
  return fetcher.post<RegisterNLResponse>(`nl/register-team`, { json: payload });
};

export const useRegisterNL = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postRegisterNL,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
