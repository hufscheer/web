import { useRef } from 'react';

import useCheerTalkById from '@/queries/useCheerTalkById';
import useGameById from '@/queries/useGameById';
import useSaveCheerTalkMutation from '@/queries/useSaveCheerTalkMutation/query';
import { GameCheerTalkType } from '@/types/game';

import CheerTalkForm from '../CheerTalkForm';
import CheerTalkList from '../CheerTalkList';
import * as styles from '../CheerTalkModal.css';

type ModalSectionProps = {
  gameId: string;
  cheerTalks: GameCheerTalkType[];
};

export default function ModalSection({
  gameId,
  cheerTalks,
}: ModalSectionProps) {
  const { cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const { gameDetail } = useGameById(gameId);

  const { mutate } = useSaveCheerTalkMutation();

  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    (scrollRef.current as HTMLDivElement).scrollIntoView();
  };

  return (
    <div className={styles.cheerTalkListContainer}>
      <ul className={styles.cheerTalkList}>
        <CheerTalkList
          cheerTalkList={cheerTalkList.pages.flat()}
          scrollToBottom={scrollToBottom}
          {...rest}
        />
        <CheerTalkList.SocketList cheerTalkList={cheerTalks} />
        <li ref={scrollRef}></li>
      </ul>
      <CheerTalkForm
        gameTeams={gameDetail.gameTeams}
        gameId={gameId}
        mutate={mutate}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
