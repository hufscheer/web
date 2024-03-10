import { Modal } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AsyncBoundary from '@/components/AsyncBoundary';
import Banner from '@/components/cheertalk/Modal/Banner';
import CheerTalkList from '@/components/cheertalk/Modal/CheerTalkList';
import {
  timeline,
  wrapper,
} from '@/components/cheertalk/Modal/CheerTalkModal.css';
import ModalSection from '@/components/cheertalk/Modal/Section';
import Loader from '@/components/Loader';
import useSocket from '@/hooks/useSocket';
import { GameCheerTalkType, GameState } from '@/types/game';

import * as styles from './GameList.css';

export default function GameButton({
  id,
  state,
}: {
  id: number;
  state: GameState;
}) {
  const router = useRouter();
  const [cheerTalks, setCheerTalks] = useState<
    (GameCheerTalkType & {
      direction: 'left' | 'right';
      logoImageUrl: string;
    })[]
  >([]);

  const gameId = id.toString();

  const handleSocketMessage = (
    cheerTalk: GameCheerTalkType & {
      direction: 'left' | 'right';
      logoImageUrl: string;
    },
  ) => {
    if (cheerTalk) {
      setCheerTalks(prev => [...prev, cheerTalk]);
    }
  };

  const { connect } = useSocket({
    url: 'wss://api.hufstreaming.site/ws',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  if (state === 'scheduled') {
    return <div className={styles.gameButtonArea.root}></div>;
  }

  return (
    <div className={styles.gameButtonArea.root}>
      {state === 'playing' && (
        <Modal>
          <Modal.Trigger>
            <div className={styles.gameButtonArea.cheer}>응원</div>
          </Modal.Trigger>
          <Modal.Content className={wrapper}>
            <AsyncBoundary
              errorFallback={props => <>{props}</>}
              loadingFallback={<></>}
            >
              <Banner gameId={gameId} />
            </AsyncBoundary>

            <div className={timeline}></div>
            <AsyncBoundary
              errorFallback={props => (
                <CheerTalkList.ErrorFallback {...props} />
              )}
              loadingFallback={<Loader />}
            >
              <ModalSection gameId={gameId} cheerTalks={cheerTalks} />
            </AsyncBoundary>
            <Modal.Close onClick={() => router.push(`/game/${id}`)} />
          </Modal.Content>
        </Modal>
      )}
      <Link href={`/game/${id}`} className={styles.gameButtonArea.record}>
        기록
      </Link>
    </div>
  );
}
