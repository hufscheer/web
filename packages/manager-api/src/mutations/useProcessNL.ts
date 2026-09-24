import { useMutation } from '@hcc/api-base';

import type { ProcessNLPayload, ProcessNLResponse } from '../types/nl';

import { fetcher } from '../fetcher';

const postProcessNL = (payload: ProcessNLPayload) => {
  return fetcher.post<ProcessNLResponse>('nl/process', { json: payload });
};

export const useProcessNL = () => {
  return useMutation({
    mutationFn: postProcessNL,
  });
};
