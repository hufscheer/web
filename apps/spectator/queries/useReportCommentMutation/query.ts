import { useMutation } from '@tanstack/react-query';

import { postReportComment } from '@/api/match';

export default function useReportCommentMutation() {
  return useMutation({
    mutationKey: ['report-comment'],
    mutationFn: postReportComment,
  });
}
