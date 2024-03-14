import { useMutation } from '@tanstack/react-query';

import { postReport } from '@/api/report';

type Params = {
  cheerTalkId: number;
};

export default function useRestoreReportMutation() {
  return useMutation({
    mutationFn: ({ cheerTalkId }: Params) => postReport(cheerTalkId),
  });
}
