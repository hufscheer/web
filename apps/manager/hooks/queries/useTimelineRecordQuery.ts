import { useQuery } from '@tanstack/react-query';

import { getTimelineRecord } from '@/api/game';

export const TIMELINE_QUERY_KEY = 'game-timeline';
export const useTimelineRecordQuery = (recordId: string) => {
  const query = useQuery({
    queryKey: [TIMELINE_QUERY_KEY, { recordId }],
    queryFn: () => getTimelineRecord(recordId),
  });

  if (query.error) throw query.error;

  return query;
};
