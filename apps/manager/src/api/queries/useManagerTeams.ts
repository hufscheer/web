import { useQuery } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export const useManagerTeams = (units: string[], sportType: string) =>
  useQuery({
    ...queryKeys.teams.managerList({ units, sportType }),
    enabled: units.length > 0,
  });
