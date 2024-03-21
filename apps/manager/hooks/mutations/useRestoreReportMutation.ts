import { useMutation } from '@tanstack/react-query';

import { postInvalidReport } from '@/api/report';

type Params = {
  reportId: number;
};

export default function useRestoreReportMutation() {
  return useMutation({
    mutationFn: ({ reportId }: Params) => postInvalidReport(reportId),
  });
}
