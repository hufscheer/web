import { useMutation } from '@hcc/api-base';
import { toast } from '@hcc/ui'; // 토스트 메시지를 위한 import

import type { CheerTalkType } from '~/api';

import { fetcher } from '../queryKey';

type Request = Pick<CheerTalkType, 'gameTeamId' | 'content'>;

const postCreateCheerTalk = (request: Request) => {
  return fetcher.post('cheer-talks', { json: request });
};

export const useCreateCheerTalk = () =>
  useMutation({
    mutationFn: postCreateCheerTalk,
    onError: (error: { status?: number; response?: { status: number } }) => {
      const status = error.status || error.response?.status;
      if (status === 400) {
        toast.error('부적절한 단어가 포함되어 있어 전송할 수 없어요');
      } else {
        toast.error('메시지 전송에 실패했어요 다시 시도해 주세요');
      }
    },
  });
