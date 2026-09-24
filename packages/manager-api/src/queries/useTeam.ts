import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { TeamDetailPayload } from '../types';

import { queryKeys } from '../queryKey';

export const useTeam = ({ id }: TeamDetailPayload) => useQuery(queryKeys.teams.detail({ id }));

export const useSuspenseTeam = ({ id }: TeamDetailPayload) =>
  useSuspenseQuery(queryKeys.teams.detail({ id }));
