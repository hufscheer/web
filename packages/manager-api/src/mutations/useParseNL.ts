import { useMutation } from '@hcc/api-base';

import type { ParseNLPayload, ParseNLResponse } from '../types/nl';

import { fetcher } from '../fetcher';

const postParseNL = (payload: ParseNLPayload) => {
  return fetcher.post<ParseNLResponse>(`nl/parse`, { json: payload });
};

export const useParseNL = () => {
  return useMutation({
    mutationFn: postParseNL,
  });
};
