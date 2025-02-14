import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeaguesManageOnManager = () =>
  useQuery(queryKeys.leaguesManageOnManager());
