import { useMutation } from '@hcc/api-base';

import { fetcher } from '../queryKey';

type Request = {
  cheerTalkId: number;
};

const postCreateCheerTalkReport = (request: Request) => {
  return fetcher.post('reports', { json: request });
};

export const useCreateCheerTalkReport = () =>
  useMutation({ mutationFn: postCreateCheerTalkReport });
