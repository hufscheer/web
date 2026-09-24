import { useMutation } from '@hcc/api-base';

import type { CheckDuplicateNLResponse, NLPlayerInput } from '../types/nl';

import { fetcher } from '../fetcher';

const postCheckDuplicateNL = (payload: { players: NLPlayerInput[] }) => {
  return fetcher.post<CheckDuplicateNLResponse>(`nl/check-duplicates`, { json: payload });
};

export const useCheckDuplicateNL = () => {
  return useMutation({
    mutationFn: postCheckDuplicateNL,
  });
};
