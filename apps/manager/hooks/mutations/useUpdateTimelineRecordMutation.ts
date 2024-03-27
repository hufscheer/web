import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTimelineRecord } from '@/api/game';
import { TIMELINE_QUERY_KEY } from '@/hooks/queries/useTimelineQuery';
import { GenericRecordPayload, LowerRecordType } from '@/types/game';

export default function useUpdateTimelineRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      recordId,
      recordType,
      params,
    }: {
      recordId: string;
      recordType: LowerRecordType;
      params: GenericRecordPayload<typeof recordType>;
    }) => {
      return updateTimelineRecord(recordId, recordType, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TIMELINE_QUERY_KEY] });
    },
  });
}
