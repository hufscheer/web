import { getQueryClient, useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { TeamDetailPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useTeam = (payload: TeamDetailPayload) => useQuery(queryKeys.teams.detail(payload));

export const useSuspenseTeam = (payload: TeamDetailPayload) =>
  useSuspenseQuery(queryKeys.teams.detail(payload));

export const fetchTeam = async (payload: TeamDetailPayload) =>
  await getQueryClient().fetchQuery(queryKeys.teams.detail(payload));
