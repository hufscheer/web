import { useMutation } from '@tanstack/react-query';

import { createReportBlock } from '@/api/report';

type Params = {
  reportId: number;
};

export default function useCreateReportBlockMutation() {
  return useMutation({
    mutationFn: ({ reportId }: Params) => createReportBlock(reportId),
  });
}
