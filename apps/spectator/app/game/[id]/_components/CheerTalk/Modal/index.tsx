import { Modal } from '@hcc/ui';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import CheerTalkBanner from './Banner';
import CheerTalkList from './List';
import * as styles from './Modal.css';
import CheerTalkTimeline from './Timeline';
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
  return (
    <Modal>
      <Modal.Trigger as="span">
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
          cheerTalkList={cheerTalkList}
          socketTalkList={socketTalkList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
        />
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
