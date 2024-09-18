import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagueTeam = (leagueTeamId: string) =>
  useQuery(queryKeys.leagueTeam(leagueTeamId));

export default useLeagueTeam;
