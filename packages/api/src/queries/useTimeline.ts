import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useTimeline = (gameId: string) =>
  useQuery(queryKeys.timeline(gameId));
