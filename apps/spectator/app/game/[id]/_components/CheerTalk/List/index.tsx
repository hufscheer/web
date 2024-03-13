import { useEffect, useRef, memo } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useThrottle from '@/hooks/useThrottle';
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

  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const throttledFetchNextPage = useThrottle(fetchNextPage, 1000);

  const { ref } = useIntersectionObserver<HTMLLIElement>(() => {
    if (hasNextPage && !isFetching) {
      throttledFetchNextPage();
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className={styles.list.container}>
      <ul ref={scrollRef} className={styles.list.content}>
        <li ref={ref}></li>

        {/* HTTP */}
        {cheerTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`cheer-${talk.cheerTalkId}`} />
        ))}

        {/* Socket */}
        {socketTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`socket-${talk.cheerTalkId}`} />
        ))}
      </ul>
      <CheerTalkForm
        gameTeams={gameDetail.gameTeams}
        saveCheerTalkMutate={mutate}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
