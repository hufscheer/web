import { useState } from 'react';

import { type CheerTalkType, type GameCheerTalkWithTeamInfo } from '~/api';
import useSocket from '~/hooks/useSocket';

import { useSuspenseGameTeamInfo } from '../useGameTeamInfo';

const SOCKET_BUFFER_LIMIT = 200;

export const useGameCheerTalkSocket = (gameId: number) => {
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);
  const [items, setItems] = useState<GameCheerTalkWithTeamInfo[]>([]);

  useSocket<CheerTalkType>({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: (talk) => {
      const enriched = { ...talk, ...getTeamInfo(talk.gameTeamId) };
      setItems((prev) => {
        const next = [...prev, enriched];
        return next.length > SOCKET_BUFFER_LIMIT
          ? next.slice(next.length - SOCKET_BUFFER_LIMIT)
          : next;
      });
    },
  });

  return items;
};
