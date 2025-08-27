import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '../queryKey';

export const useTeams = () => useQuery(queryKeys.teams.list);

export const useSuspenseTeams = () => useSuspenseQuery(queryKeys.teams.list);
