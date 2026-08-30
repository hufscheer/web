import { useMutation } from '@hcc/api-base';

import type { CheerTalkType } from '~/api';

import { fetcher } from '~/api/fetcher';

import { handleHTTPError } from '../http-error';

type Request = Pick<CheerTalkType, 'gameTeamId' | 'content'>;

const postCreateCheerTalk = (request: Request) => {
  return fetcher.post('cheer-talks', { json: request });
};

export const useCreateCheerTalk = () =>
  useMutation({
    mutationFn: postCreateCheerTalk,
    onError: (error) =>
      handleHTTPError(error, (status) => {
        let msg = '메시지 전송에 실패했어요 다시 시도해 주세요';

        if (status === 400) msg = '부적절한 단어가 포함되어 있어 전송할 수 없어요';
        if (status === 429) msg = '메시지를 너무 많이 보내고 있어요. 잠시 후 다시 시도해 주세요.';

        return msg;
      }),
  });
