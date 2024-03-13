import { Modal } from '@hcc/ui';
import { useState } from 'react';

import useSocket from '@/hooks/useSocket';
import useCheerTalkById from '@/queries/useCheerTalkById';
import useGameById from '@/queries/useGameById';
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

  const { gameDetail } = useGameById(gameId);
  const getTeamInfo = (gameTeamId: number) => {
    const order = gameDetail.gameTeams.findIndex(
      team => team.gameTeamId === gameTeamId,
    );

    return {
      direction: (['left', 'right'] as const)[order],
      logoImageUrl: gameDetail.gameTeams[order].logoImageUrl,
    };
  };

  const { cheerTalkList, ...rest } = useCheerTalkById(gameId);

  const handleSocketMessage = (cheerTalk: GameCheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList(prev => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  const { connect } = useSocket({
    url: 'wss://api.hufstreaming.site/ws',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  return (
    <Modal defaultState={defaultState}>
      <Modal.Trigger as="span">
        <CheerTalkOnAir
          cheerTalk={
            !socketTalkList.length ? cheerTalkList.pages : socketTalkList
          }
        />
        <CheerTalkEntryButton />
      </Modal.Trigger>
      <Modal.Content className={styles.wrapper}>
        {/* Game Banner */}
        <CheerTalkBanner gameId={gameId} />

        {/* Game Timeline */}
        <CheerTalkTimeline gameId={gameId} />

        {/* CheerTalk List */}
        <CheerTalkList
          gameId={gameId}
          cheerTalkList={cheerTalkList.pages}
          socketTalkList={socketTalkList}
          hasNextPage={rest.hasNextPage}
          fetchNextPage={rest.fetchNextPage}
          isFetching={rest.isFetching}
        />
        <Modal.Close className={styles.close} />
      </Modal.Content>
    </Modal>
  );
}
