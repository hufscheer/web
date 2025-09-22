import { fetcher, useMutation } from '@hcc/api-base';
import type { CheerTalkType } from '~/api';

type Request = Pick<CheerTalkType, 'gameTeamId' | 'content'>;

const postCreateCheerTalk = (request: Request) => {
  return fetcher.post('cheer-talks', { json: request });
};

export const useCreateCheerTalk = () => useMutation({ mutationFn: postCreateCheerTalk });
