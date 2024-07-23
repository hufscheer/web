import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useGame = (gameId: string) => useQuery(queryKeys.game(gameId));

export default useGame;
