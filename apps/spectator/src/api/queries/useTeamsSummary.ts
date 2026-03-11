import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { TeamListPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useTeamsSummary = (payload: TeamListPayload) =>
  useQuery(queryKeys.teams.summary(payload));

export const useSuspenseTeamsSummary = (payload: TeamListPayload) =>
  useSuspenseQuery(queryKeys.teams.summary(payload));
