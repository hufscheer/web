import { useQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export const useTeamUnits = (sportType: string) => useQuery(queryKeys.teams.units({ sportType }));
