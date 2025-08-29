import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { GameListPayload, GameType } from './types';

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType[]>('games', { json: payload }),
  }),
});

export const queryKeys = mergeQueryKeys(gameQueryKeys);
