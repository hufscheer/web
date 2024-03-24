import { useMutation } from '@tanstack/react-query';

import { updateCheerTalkUnblock } from '@/api/report';

type Params = {
  cheerTalkId: number;
};

export default function useUpdateCheerTalkUnblockMutation() {
  return useMutation({
    mutationFn: ({ cheerTalkId }: Params) =>
      updateCheerTalkUnblock(cheerTalkId),
  });
}
