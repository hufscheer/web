import { Modal } from '@hcc/ui';
import { useRef } from 'react';

import useGameById from '@/queries/useGameById';
import useSaveCheerTalkMutation from '@/queries/useSaveCheerTalkMutation/query';
import { GameCheerTalkWithTeamInfo } from '@/types/game';

import Banner from './Banner';
import CheerTalkForm from './Form';
import CheerTalkList from './List';
import * as styles from './Modal.css';
import CheerTalkEntryButton from '../EntryButton';

interface CheerTalkModalProps {
  gameId: string;
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  socketTalkList: GameCheerTalkWithTeamInfo[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export default function CheerTalkModal({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: CheerTalkModalProps) {
  const { gameDetail } = useGameById(gameId);

  const { mutate } = useSaveCheerTalkMutation();

  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    (scrollRef.current as HTMLDivElement).scrollIntoView();
  };

  return (
    <Modal>
      <Modal.Trigger as="span">
        <CheerTalkEntryButton />
      </Modal.Trigger>
      <Modal.Content className={styles.wrapper}>
        {/* Game Banner */}
        <Banner gameId={gameId} />

        {/* Game Timeline */}
        <div className={styles.timeline}></div>

        {/* CheerTalk List */}
        <div className={styles.cheerTalkListContainer}>
          <ul className={styles.cheerTalkList}>
            <CheerTalkList
              cheerTalkList={cheerTalkList}
              scrollToBottom={scrollToBottom}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
            />
            <CheerTalkList.SocketList cheerTalkList={socketTalkList} />
            <li ref={scrollRef}></li>
          </ul>
          <CheerTalkForm
            gameId={gameId}
            gameTeams={gameDetail.gameTeams}
            mutate={mutate}
            scrollToBottom={scrollToBottom}
          />
        </div>
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
