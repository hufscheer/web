import { useQuery } from '@hcc/api-base';

import type { PlayerSearchPayload } from '~/api/types';

import { queryKeys } from '~/api/queryKey';

export const usePlayerSearch = (payload: PlayerSearchPayload) =>
  useQuery({
    ...queryKeys.players.search(payload),
    placeholderData: (previous) => previous,
  });
