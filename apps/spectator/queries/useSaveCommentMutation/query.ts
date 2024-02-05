import { useMutation } from '@tanstack/react-query';

import { postMatchComment } from '@/api/match';

export default function useSaveCommentMutation() {
  return useMutation({
    mutationKey: ['save-comment'],
    mutationFn: postMatchComment,
  });
}
