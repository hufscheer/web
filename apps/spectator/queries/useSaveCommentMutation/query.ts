import { useMutation } from '@tanstack/react-query';

import { postGameComment } from '@/api/game';

export default function useSaveCommentMutation() {
  return useMutation({
    mutationKey: ['save-comment'],
    mutationFn: postGameComment,
  });
}
