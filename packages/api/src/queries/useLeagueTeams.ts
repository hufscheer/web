import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagueTeams = (leagueId: string, descriptionOfRound?: string) =>
  useQuery(queryKeys.leagueTeams(leagueId, descriptionOfRound));

export default useLeagueTeams;
