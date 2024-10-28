import { ArrowDownIcon } from '@hcc/icons';
import { Icon, Spinner } from '@hcc/ui';
import { useEffect, useRef, memo, useState } from 'react';

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
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);

  const { gameDetail } = useGameById(gameId);
  const { mutate } = useSaveCheerTalkMutation();

  const bottomRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = () => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView(false);
  };
  const [run] = useTimeout(scrollToBottom, 100);

  const checkScrollHeight = useThrottle(() => {
    if (!scrollRef.current) return;

    const isBottom =
      scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
      scrollRef.current.clientHeight;

    setShowScrollToBottomButton(!isBottom);
  }, 250);

  const throttledFetchNextPage = useThrottle(fetchNextPage, 1000);

  const { ref } = useIntersectionObserver<HTMLLIElement>(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      throttledFetchNextPage();
    }
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollHeight;
    setScrollHeight(scrollRef.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cheerTalkList]);

  useEffect(() => scrollToBottom(), []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollHeight);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollHeight);
      }
    };
  }, [checkScrollHeight]);

  return (
    <div className={styles.list.container}>
      <ul ref={scrollRef} className={styles.list.content}>
        {hasNextPage && <Spinner />}
        <li ref={ref} />
        {/* HTTP */}
        {cheerTalkList.map(talk => (
          <CheerTalkItemMemo
            key={`cheer-${talk.cheerTalkId}`}
            hasMenu
            {...talk}
          />
        ))}

        {/* Socket */}
        {socketTalkList.map(talk => (
          <CheerTalkItemMemo
            key={`socket-${talk.cheerTalkId}`}
            hasMenu
            {...talk}
          />
        ))}
        <li ref={bottomRef} />
      </ul>
      <CheerTalkForm
        gameTeams={gameDetail.gameTeams}
        saveCheerTalkMutate={mutate}
        scrollToBottom={run}
      />
      {showScrollToBottomButton && (
        <button
          className={styles.scrollToBottomButton}
          onClick={run}
          type="button"
        >
          <Icon source={ArrowDownIcon} size={16} color="black" />
        </button>
      )}
    </div>
  );
}
