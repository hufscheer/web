import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { StateType } from '../types';

const useGames = (
  league_id: string,
  state: StateType,
  cursor?: number,
  size?: number,
  league_team_id?: number,
  round?: number,
) =>
  useQuery(
    queryKeys.games(league_id, state, cursor, size, league_team_id, round),
  );

export default useGames;
