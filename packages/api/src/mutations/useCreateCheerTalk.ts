import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { CheerTalkType } from '../types';

type Request = Pick<CheerTalkType, 'gameTeamId' | 'content'>;

const postCreateCheerTalk = (request: Request) => {
  return fetcher.post(`/cheer-talks`, request);
};

export const useCreateCheerTalk = () =>
  useMutation({ mutationFn: postCreateCheerTalk });
