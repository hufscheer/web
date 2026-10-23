import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ExecuteNLPayload, ExecuteNLResponse } from '~/api/types/nl';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

const postExecuteNL = (payload: ExecuteNLPayload) => {
  return fetcher.post<ExecuteNLResponse>('nl/execute', { json: payload });
};

export const useExecuteNL = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postExecuteNL,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.teams._def }),
        qc.invalidateQueries({ queryKey: queryKeys.players._def }),
        qc.invalidateQueries({ queryKey: queryKeys.leagues._def }),
      ]);
    },
  });
};
