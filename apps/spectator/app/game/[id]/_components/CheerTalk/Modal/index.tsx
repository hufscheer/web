import { Modal } from '@hcc/ui';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import * as styles from './Modal.css';
import CheerTalkBanner from '../Banner';
import CheerTalkEntryButton from '../EntryButton';
import CheerTalkList from '../List';
import CheerTalkTimeline from '../Timeline';

interface CheerTalkModalProps {
  gameId: string;
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  socketTalkList: GameCheerTalkWithTeamInfo[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  defaultState?: boolean;
}

export default function CheerTalkModal({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  defaultState,
}: CheerTalkModalProps) {
  return (
    <Modal defaultState={defaultState}>
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
        <Modal.Close className={styles.close} />
      </Modal.Content>
    </Modal>
  );
}
