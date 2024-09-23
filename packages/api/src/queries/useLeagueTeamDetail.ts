import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagueTeamDetail = (teamId: string) => {
  return useSuspenseQuery(queryKeys.leagueTeamDetail(teamId));
};

export default useLeagueTeamDetail;
