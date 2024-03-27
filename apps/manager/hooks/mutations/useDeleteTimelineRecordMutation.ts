import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTimelineRecord } from '@/api/game';
import { TIMELINE_QUERY_KEY } from '@/hooks/queries/useTimelineQuery';

export default function useDeleteTimelineRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimelineRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TIMELINE_QUERY_KEY] });
    },
  });
}
