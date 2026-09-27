import { useQueryClient } from '@hcc/api-base';
import { debounce } from 'es-toolkit/function';
import { useEffect, useMemo } from 'react';

import { queryKeys } from '~/api/queryKey';
import useSocket from '~/hooks/useSocket';

const SYNC_DELAY_MS = 300;

type TimelineChangedMessage = {
  gameId: number;
  changeType: 'CREATED' | 'DELETED';
};

export const useGameTimelineSync = (gameId: number) => {
  const queryClient = useQueryClient();

  const syncGame = useMemo(
    () =>
      debounce(() => {
        const payload = { gameId };
        void Promise.all([
          queryClient.invalidateQueries({ queryKey: queryKeys.games.detail(payload).queryKey }),
          queryClient.invalidateQueries({ queryKey: queryKeys.games.timeline(payload).queryKey }),
          queryClient.invalidateQueries({
            queryKey: queryKeys.games.quarterScores(payload).queryKey,
          }),
          queryClient.invalidateQueries({ queryKey: queryKeys.games.lineup(payload).queryKey }),
        ]);
      }, SYNC_DELAY_MS),
    [queryClient, gameId],
  );

  useEffect(() => () => syncGame.cancel(), [syncGame]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncGame();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncGame]);

  useSocket<TimelineChangedMessage>({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}/timeline`,
    callback: syncGame,
    onReconnect: syncGame,
  });
};
