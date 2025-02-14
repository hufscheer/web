import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeaguesOnManager = () => useQuery(queryKeys.leaguesOnManager());
