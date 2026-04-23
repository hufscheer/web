'use client';

import { useMemo, useState } from 'react';

import type { CheerTalkType, GameCheerTalkWithTeamInfo, SportType } from '~/api';

import useSocket from '~/hooks/useSocket';

import { CheerTalkList } from './cheer-talk-list';
import { CheerTalkTimeline } from './cheer-talk-timeline';
import useCheerTalkById from './useCheerTalkById';
import { useSuspenseGameTeamInfo } from './useGameTeamInfo';

type Props = {
  gameId: number;
  sportType: SportType;
};

export const CheerTalk = ({ gameId, sportType }: Props) => {
  const [socketTalkList, setSocketTalkList] = useState<GameCheerTalkWithTeamInfo[]>([]);
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  const { data: cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const cheerTalks = useMemo(
    () => (cheerTalkList ? cheerTalkList.pages.flat() : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: CheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList((prev) => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0">
        <CheerTalkTimeline gameId={gameId} sportType={sportType} />
      </div>

      <CheerTalkList
        gameId={gameId}
        cheerTalkList={cheerTalks}
        socketTalkList={socketTalkList}
        {...rest}
      />
    </div>
  );
};
