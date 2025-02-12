import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGame = (gameId?: string) => useQuery(queryKeys.game(gameId));
