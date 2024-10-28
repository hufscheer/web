import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useGameLineup = (gameId: string) => useQuery(queryKeys.lineup(gameId));

export default useGameLineup;
