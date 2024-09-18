import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagueTeamPlayers = (leagueTeamId: string) =>
  useQuery(queryKeys.leagueTeamPlayers(leagueTeamId));

export default useLeagueTeamPlayers;
