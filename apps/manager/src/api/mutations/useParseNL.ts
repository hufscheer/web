import { fetcher, useMutation } from '@hcc/api-base';

import type { ParseNLPayload, ParseNLResponse } from '~/api/types/nl';

const postParseNL = (payload: ParseNLPayload) => {
  return fetcher.post<ParseNLResponse>(`nl/parse`, { json: payload });
};

export const useParseNL = () => {
  return useMutation({
    mutationFn: postParseNL,
  });
};
