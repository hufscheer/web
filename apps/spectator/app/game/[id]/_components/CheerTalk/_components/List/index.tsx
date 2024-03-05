import { useEffect, useRef, memo } from 'react';

import useInfiniteObserver from '@/hooks/useInfiniteObserver';
import useGameById from '@/queries/useGameById';
import useSaveCheerTalkMutation from '@/queries/useSaveCheerTalkMutation/query';
import { GameCheerTalkWithTeamInfo } from '@/types/game';

import * as styles from './List.css';
import CheerTalkForm from '../Form';
import CheerTalkItem from '../Item';

interface CheerTalkListProps {
  gameId: string;
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  socketTalkList: GameCheerTalkWithTeamInfo[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
}

const CheerTalkItemMemo = memo(CheerTalkItem);

export default function CheerTalkList({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: CheerTalkListProps) {
  const { gameDetail } = useGameById(gameId);
  const { mutate } = useSaveCheerTalkMutation();

  const scrollRef = useRef<HTMLLIElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView();
  };

  const { ref } = useInfiniteObserver<HTMLDivElement>(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  useEffect(() => {
    scrollToBottom();
  }, [cheerTalkList, socketTalkList]);

  return (
    <div className={styles.list.container}>
      <ul className={styles.list.content}>
        <div ref={ref}></div>

        {/* HTTP */}
        {cheerTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`cheer-${talk.cheerTalkId}`} />
        ))}

        {/* Socket */}
        {socketTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`socket-${talk.cheerTalkId}`} />
        ))}

        <li ref={scrollRef}></li>
      </ul>
      <CheerTalkForm
        gameTeams={gameDetail.gameTeams}
        saveCheerTalkMutate={mutate}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
