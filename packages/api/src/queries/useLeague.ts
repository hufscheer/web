import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeague = (leagueId: string) => useQuery(queryKeys.league(leagueId));

export default useLeague;
