import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { TeamUnitsPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useTeamUnitAvailability = (payload: TeamUnitsPayload) =>
  useQuery(queryKeys.teams.units(payload));

export const useSuspenseTeamUnitAvailability = (payload: TeamUnitsPayload) =>
  useSuspenseQuery(queryKeys.teams.units(payload));
