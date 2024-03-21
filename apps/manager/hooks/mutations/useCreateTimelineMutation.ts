import { useMutation } from '@tanstack/react-query';

import { createGameTimeline } from '@/api/game';
import { GenericRecordPayload, LowerRecordType } from '@/types/game';

export default function useCreateTimelineMutation() {
  return useMutation({
    mutationFn: ({
      recordType,
      params,
    }: {
      recordType: LowerRecordType;
      params: GenericRecordPayload<typeof recordType>;
    }) => createGameTimeline(recordType, params),
  });
}
