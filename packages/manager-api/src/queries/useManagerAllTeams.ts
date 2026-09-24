import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export const useManagerAllTeams = () => useQuery(queryKeys.teams.manager);

export const useSuspenseManagerAllTeams = () => useSuspenseQuery(queryKeys.teams.manager);
