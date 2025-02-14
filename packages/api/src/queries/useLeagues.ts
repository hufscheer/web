import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { getQueryClient } from '../utils';

export const useLeagues = (year?: string) => useQuery(queryKeys.leagues(year));

export const fetchLeagues = async (year?: string) => {
  const queryClient = getQueryClient();
  return await queryClient.fetchQuery(queryKeys.leagues(year));
};
