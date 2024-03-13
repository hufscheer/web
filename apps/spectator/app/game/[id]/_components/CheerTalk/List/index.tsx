import { useEffect, useRef, memo, useState } from 'react';

import Loader from '@/components/Loader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useThrottle from '@/hooks/useThrottle';
import { useTimeout } from '@/hooks/useTimeout';
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
  isFetchingNextPage: boolean;
}

const CheerTalkItemMemo = memo(CheerTalkItem);

export default function CheerTalkList({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}: CheerTalkListProps) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const { gameDetail } = useGameById(gameId);
  const { mutate } = useSaveCheerTalkMutation();

  const bottomRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = () => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView(false);
  };
  const [run] = useTimeout(scrollToBottom, 100);

  const throttledFetchNextPage = useThrottle(fetchNextPage, 1000);

  const { ref } = useIntersectionObserver<HTMLLIElement>(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      throttledFetchNextPage();
    }
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollHeight - scrollHeight;
    scrollRef.current.scrollTop = scrollTop;
    setScrollHeight(scrollRef.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cheerTalkList]);

  useEffect(() => scrollToBottom(), []);

  return (
    <div className={styles.list.container}>
      <ul ref={scrollRef} className={styles.list.content}>
        {isFetchingNextPage && <Loader />}
        <li ref={ref} />
        {/* HTTP */}
        {cheerTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`cheer-${talk.cheerTalkId}`} />
        ))}

        {/* Socket */}
        {socketTalkList.map(talk => (
          <CheerTalkItemMemo {...talk} key={`socket-${talk.cheerTalkId}`} />
        ))}
        <li ref={bottomRef} />
      </ul>
      <CheerTalkForm
        gameTeams={gameDetail.gameTeams}
        saveCheerTalkMutate={mutate}
        scrollToBottom={run}
      />
    </div>
  );
}
