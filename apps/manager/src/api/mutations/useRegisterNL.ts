import { fetcher, useMutation } from '@hcc/api-base';

import type { RegisterNLResponse, RegisterNLPayload } from '~/api/types/nl';

const postRegisterNL = (payload: RegisterNLPayload) => {
  return fetcher.post<RegisterNLResponse>(`nl/register-team`, { json: payload });
};

export const useRegisterNL = () => {
  return useMutation({
    mutationFn: postRegisterNL,
  });
};
