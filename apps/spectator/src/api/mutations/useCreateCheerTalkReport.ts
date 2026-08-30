import { useMutation } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';

type Request = {
  cheerTalkId: number;
};

const postCreateCheerTalkReport = (request: Request) => {
  return fetcher.post('reports', { json: request });
};

export const useCreateCheerTalkReport = () =>
  useMutation({ mutationFn: postCreateCheerTalkReport });
