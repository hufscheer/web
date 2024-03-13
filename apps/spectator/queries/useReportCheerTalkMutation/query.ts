import { useMutation } from '@tanstack/react-query';

import { postReportCheerTalk } from '@/api/game';

export default function useReportCheerTalkMutation() {
  return useMutation({
    mutationKey: ['report-report'],
    mutationFn: postReportCheerTalk,
  });
}
