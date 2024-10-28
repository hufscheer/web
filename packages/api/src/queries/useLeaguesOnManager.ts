import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeaguesOnManager = () => useQuery(queryKeys.leaguesOnManager());

export default useLeaguesOnManager;
