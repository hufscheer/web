import { useQuery } from '@tanstack/react-query';

import { getReports } from '@/api/report';

export const REPORT_QUERY_KEY = 'report';
export default function useReportsQuery() {
  const { data, error, refetch } = useQuery({
    queryKey: [REPORT_QUERY_KEY],
    queryFn: getReports,
  });

  if (error) throw error;

  return { data, refetch };
}
