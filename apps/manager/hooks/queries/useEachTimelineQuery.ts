import { useQuery } from '@tanstack/react-query';

import { getEachTimeline } from '@/api/game';

export const EACH_TIMELINE_QUERY_KEY = 'each-timeline';
export default function useEachTimelineQuery(recordId: string) {
  const query = useQuery({
    queryKey: [EACH_TIMELINE_QUERY_KEY, recordId],
    queryFn: () => getEachTimeline(recordId),
  });

  if (query.error) throw query.error;

  return query;
}
