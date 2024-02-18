import { useMutation } from '@tanstack/react-query';

import { postReportCheerTalk } from '@/api/game';

export default function useReportCommentMutation() {
  return useMutation({
    mutationKey: ['report-comment'],
    mutationFn: postReportCheerTalk,
  });
}
