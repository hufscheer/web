import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { TeamListPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useTeams = (payload: TeamListPayload) => useQuery(queryKeys.teams.list(payload));

export const useSuspenseTeams = (payload: TeamListPayload) =>
  useSuspenseQuery(queryKeys.teams.list(payload));
