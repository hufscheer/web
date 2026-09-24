import { useQuery } from '@hcc/api-base';

import type { PlayerSearchPayload } from '../types';

import { queryKeys } from '../queryKey';

export const usePlayerSearch = (payload: PlayerSearchPayload) =>
  useQuery({
    ...queryKeys.players.search(payload),
    placeholderData: (previous) => previous,
  });
