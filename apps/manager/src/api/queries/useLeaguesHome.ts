import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';

export const useLeaguesHome = () => useQuery(queryKeys.leagues.home);

export const useSuspenseLeaguesHome = () => useSuspenseQuery(queryKeys.leagues.home);
