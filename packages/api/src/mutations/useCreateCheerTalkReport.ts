import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

type Request = {
  cheerTalkId: number;
};

const postCreateCheerTalkReport = (request: Request) => {
  return fetcher.post(`/reports`, request);
};

export const useCreateCheerTalkReport = () =>
  useMutation({ mutationFn: postCreateCheerTalkReport });
