import { useQuery } from '@tanstack/react-query';

import { getReportList } from '@/api/report';

export const REPORT_QUERY_KEY = 'report';
export default function useReportsQuery() {
  const { data, error, refetch } = useQuery({
    queryKey: [REPORT_QUERY_KEY],
    queryFn: getReportList,
  });

  if (error) throw error;

  return { data, refetch };
}
