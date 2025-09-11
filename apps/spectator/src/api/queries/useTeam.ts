import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { TeamDetailPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useTeam = (payload: TeamDetailPayload) => useQuery(queryKeys.teams.detail(payload));

export const useSuspenseTeam = (payload: TeamDetailPayload) =>
  useSuspenseQuery(queryKeys.teams.detail(payload));
