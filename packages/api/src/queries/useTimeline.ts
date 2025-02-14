import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useTimeline = (gameId: string) =>
  useSuspenseQuery(queryKeys.timeline(gameId));
