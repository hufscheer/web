import { fetcher, useMutation } from '@hcc/api-base';

import type { ExecuteNLResponse, ExecuteNLPayload } from '~/api/types/nl';

const postExecuteNL = (payload: ExecuteNLPayload) => {
  return fetcher.post<ExecuteNLResponse>(`nl/execute`, { json: payload });
};

export const useExecuteNL = () => {
  return useMutation({
    mutationFn: postExecuteNL,
  });
};
