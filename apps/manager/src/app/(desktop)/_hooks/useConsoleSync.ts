import { useQueryClient } from '@hcc/api-base';
import { useEffect, useMemo } from 'react';

import { queryKeys } from '~/api';

import { useSocket } from './useSocket';

// 연달아 온 알림(경기 진행 + 쿼터 종료 등)을 한 번의 조회로 묶는다
const SYNC_DELAY_MS = 300;

interface TimelineChangedMessage {
  gameId: number;
  changeType: 'CREATED' | 'DELETED';
}

/**
 * 서버는 기록이 추가되거나 지워지면 /topic/games/{gameId}/timeline 으로 알린다(교체, 경기 진행 포함).
 * 알림이 오면, 끊겼다 다시 붙으면, 탭이 다시 보이면 콘솔 조회를 한 번 다시 받는다.
 */
export const useConsoleSync = (gameId: number) => {
  const queryClient = useQueryClient();

  const sync = useMemo(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      const payload = { gameId };
      void Promise.all(
        [
          queryKeys.games.detail(payload).queryKey,
          queryKeys.games.lineup(payload).queryKey,
          queryKeys.games.lineupPlaying(payload).queryKey,
          queryKeys.games.timeline(payload).queryKey,
          queryKeys.games.quarterScores(payload).queryKey,
          queryKeys.games.progressAvailable(payload).queryKey,
        ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      );
    };
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(run, SYNC_DELAY_MS);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
  }, [queryClient, gameId]);

  useEffect(() => () => sync.cancel(), [sync]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') sync();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [sync]);

  useSocket<TimelineChangedMessage>({
    url: process.env.NEXT_PUBLIC_SOCKET_URL ?? '',
    destination: `/topic/games/${gameId}/timeline`,
    callback: sync,
    onReconnect: sync,
  });
};
