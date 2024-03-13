import { useMutation } from '@tanstack/react-query';

import { postGameCheerTalk } from '@/api/game';

export default function useSaveCheerTalkMutation() {
  return useMutation({
    mutationKey: ['save-cheertalk'],
    mutationFn: postGameCheerTalk,
  });
}
