import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { GamesParams } from '../types';

export const useGames = (params: GamesParams) => useQuery(queryKeys.games(params));
