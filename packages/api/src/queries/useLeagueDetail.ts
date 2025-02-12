import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { getQueryClient } from '../utils';

export const useLeagues = (year?: string) => useQuery(queryKeys.leagues(year));

export const prefetchLeagues = async (year?: string) =>
  getQueryClient().fetchQuery(queryKeys.leagues(year));
