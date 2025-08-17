import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';

export const useLeaguesLeague = () => useQuery(queryKeys.leagues.league);

export const useSuspenseLeaguesLeague = () => useSuspenseQuery(queryKeys.leagues.league);
