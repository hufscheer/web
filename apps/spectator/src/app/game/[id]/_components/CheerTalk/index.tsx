import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@hcc/ui';
import { useMemo, useState } from 'react';

import useSocket from '@/src/hooks/useSocket';
import useCheerTalkById from '@/src/queries/useCheerTalkById';
import { useGameTeamInfo } from '@/src/queries/useGameTeamInfo';
import { GameCheerTalkType, GameCheerTalkWithTeamInfo } from '@/src/types/game';

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

export default function CheerTalk({ gameId, defaultState }: CheerTalkItemProps) {
  const [socketTalkList, setSocketTalkList] = useState<GameCheerTalkWithTeamInfo[]>([]);
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const { data: cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const cheerTalks = useMemo(
    () => (cheerTalkList ? cheerTalkList.pages.flatMap((talk) => talk) : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: GameCheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList((prev) => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  const { connect } = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  return (
    <Dialog defaultOpen={defaultState}>
      <DialogTrigger>
        <CheerTalkOnAir cheerTalk={!socketTalkList.length ? cheerTalkList.pages : socketTalkList} />
        <CheerTalkEntryButton />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent className={styles.root} aria-describedby={undefined}>
          <DialogTitle aria-hidden />
          <CheerTalkBanner gameId={gameId} />

          <CheerTalkTimeline gameId={gameId} />
          <CheerTalkList
            gameId={gameId}
            cheerTalkList={cheerTalks}
            socketTalkList={socketTalkList}
            {...rest}
          />
          <DialogClose className={styles.close} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
