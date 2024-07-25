import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { StateType } from '../types';

const useGames = (leagueId: string, state: StateType) =>
  useQuery(queryKeys.games(leagueId, state));

export default useGames;
