import { fetcher, useMutation } from '@hcc/api-base';

import type { ProcessNLPayload, ProcessNLResponse } from '~/api/types/nl';

const postProcessNL = (payload: ProcessNLPayload) => {
  return fetcher.post<ProcessNLResponse>(`nl/process`, { json: payload });
};

export const useProcessNL = () => {
  return useMutation({
    mutationFn: postProcessNL,
  });
};
