import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useGameLineupPlaying = (gameId: string) =>
  useQuery(queryKeys.lineupPlaying(gameId));

export default useGameLineupPlaying;
