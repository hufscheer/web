import { useMutation } from '@tanstack/react-query';

import { postReportComment } from '@/api/game';

export default function useReportCommentMutation() {
  return useMutation({
    mutationKey: ['report-comment'],
    mutationFn: postReportComment,
  });
}
