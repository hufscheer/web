import { useMutation } from '@tanstack/react-query';

import { putReport } from '@/api/report';

type Params = {
  cheerTalkId: number;
};

export default function useBlockReportMutation() {
  return useMutation({
    mutationFn: ({ cheerTalkId }: Params) => putReport(cheerTalkId),
  });
}
