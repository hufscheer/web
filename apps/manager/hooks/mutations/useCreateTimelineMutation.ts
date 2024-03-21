import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createGameTimeline } from '@/api/game';
import { GenericRecordPayload, LowerRecordType } from '@/types/game';

import { TIMELINE_QUERY_KEY } from '../queries/useTimelineQuery';

export default function useCreateTimelineMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recordType,
      params,
    }: {
      recordType: LowerRecordType;
      params: GenericRecordPayload<typeof recordType>;
    }) => {
      return createGameTimeline(recordType, params);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [TIMELINE_QUERY_KEY, { gameId: variables.params.gameId }],
      });
    },
  });
}
