import { useMutation, useQueryClient } from '@hcc/api-base';

import type { RegisterNLResponse, RegisterNLPayload } from '../types/nl';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

const postRegisterNL = (payload: RegisterNLPayload) => {
  return fetcher.post<RegisterNLResponse>(`nl/register-team`, { json: payload });
};

export const useRegisterNL = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postRegisterNL,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.teams._def }),
        qc.invalidateQueries({ queryKey: queryKeys.players._def }),
      ]);
    },
  });
};
