import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

export const useLeagues = () => useQuery(queryKeys.leagues.list);

export const useSuspenseLeagues = () => useSuspenseQuery(queryKeys.leagues.list);
