import { Modal } from '@hcc/ui';
import { useMemo, useState } from 'react';

import useSocket from '@/hooks/useSocket';
import useCheerTalkById from '@/queries/useCheerTalkById';
import { useGameTeamInfo } from '@/queries/useGameTeamInfo';
import { GameCheerTalkType, GameCheerTalkWithTeamInfo } from '@/types/game';

import CheerTalkBanner from './Banner';
import * as styles from './CheerTalk.css';
import CheerTalkEntryButton from './EntryButton';
import CheerTalkList from './List';
import CheerTalkOnAir from './OnAir';
import CheerTalkTimeline from './Timeline';

type CheerTalkItemProps = {
  gameId: string;
  defaultState?: boolean;
};

export default function CheerTalk({
  gameId,
  defaultState,
}: CheerTalkItemProps) {
  const [socketTalkList, setSocketTalkList] = useState<
    GameCheerTalkWithTeamInfo[]
  >([]);
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const { data: cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const cheerTalks = useMemo(
    () => (cheerTalkList ? cheerTalkList.pages.flatMap(talk => talk) : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: GameCheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList(prev => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  const { connect } = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  return (
    <Modal defaultState={defaultState}>
      <Modal.Trigger>
        <CheerTalkOnAir
          cheerTalk={
            !socketTalkList.length ? cheerTalkList.pages : socketTalkList
          }
        />
        <CheerTalkEntryButton />
      </Modal.Trigger>
      <Modal.Content>
        <div className={styles.wrapper}>
          {/* Game Banner */}
          <CheerTalkBanner gameId={gameId} />

          {/* Game Timeline */}
          <CheerTalkTimeline gameId={gameId} />

          {/* CheerTalk List */}
          <CheerTalkList
            gameId={gameId}
            cheerTalkList={cheerTalks}
            socketTalkList={socketTalkList}
            {...rest}
          />
          <Modal.Close className={styles.close} />
        </div>
      </Modal.Content>
    </Modal>
  );
}
