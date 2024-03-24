import { useMutation } from '@tanstack/react-query';

import { createReportUnPending } from '@/api/report';

type Params = {
  reportId: number;
};

export default function useCreateReportUnPendingMutation() {
  return useMutation({
    mutationFn: ({ reportId }: Params) => createReportUnPending(reportId),
  });
}
