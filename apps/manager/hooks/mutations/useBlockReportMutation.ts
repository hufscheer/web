import { useMutation } from '@tanstack/react-query';

import { postReport } from '@/api/report';

type Params = {
  reportId: number;
};

export default function useBlockReportMutation() {
  return useMutation({
    mutationFn: ({ reportId }: Params) => postReport(reportId),
  });
}
