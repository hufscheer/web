import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeaguesManageOnManager = () =>
  useQuery(queryKeys.leaguesManageOnManager());

export default useLeaguesManageOnManager;
