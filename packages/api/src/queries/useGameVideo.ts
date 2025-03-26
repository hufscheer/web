import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGameVideo = (gameId: string) => useSuspenseQuery(queryKeys.gameVideo(gameId));
