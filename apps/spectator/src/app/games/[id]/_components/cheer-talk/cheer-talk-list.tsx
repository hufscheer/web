'use client';
import { Spinner } from '@hcc/ui';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { type GameCheerTalkWithTeamInfo, useSuspenseGame } from '~/api';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import { useThrottle } from '~/hooks/useThrottle';
import { useTimeout } from '~/hooks/useTimeout';
import { CheerTalkForm } from './cheer-talk-form';
import CheerTalkItem from './cheer-talk-item';

interface CheerTalkListProps {
  gameId: number;
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  socketTalkList: GameCheerTalkWithTeamInfo[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
}

export const CheerTalkList = ({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}: CheerTalkListProps) => {
  const { data: game } = useSuspenseGame({ gameId });

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const [scrollToBottomWithDelay] = useTimeout(scrollToBottom, 100);

  const loadPreviousMessages = useThrottle(fetchNextPage, 1000);

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      loadPreviousMessages();
    }
  });

  const handleNewMessages = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const wasAtBottom = scrollHeight - scrollTop <= clientHeight + 10;

    if (wasAtBottom) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleInitialScroll = useCallback(() => {
    if (cheerTalkList.length === 0 && socketTalkList.length === 0) return;

    const timers = [100].map(delay => setTimeout(scrollToBottom, delay));

    return () => timers.forEach(clearTimeout);
  }, [cheerTalkList.length, socketTalkList.length, scrollToBottom]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleNewMessages
  useEffect(() => {
    handleNewMessages();
  }, [cheerTalkList, socketTalkList, handleNewMessages]);

  useEffect(() => {
    return handleInitialScroll();
  }, [handleInitialScroll]);

  // const allMessages = [...cheerTalkList, ...socketTalkList];
  const allMessages = (() => {
    const messageMap = new Map<number, GameCheerTalkWithTeamInfo>();

    cheerTalkList.forEach(talk => {
      messageMap.set(talk.cheerTalkId, talk);
    });

    socketTalkList.forEach(talk => {
      messageMap.set(talk.cheerTalkId, talk);
    });

    return Array.from(messageMap.values()).sort((a, b) => a.cheerTalkId - b.cheerTalkId);
  })();
  return (
    <Fragment>
      <div ref={scrollRef} className="w-full flex-1 overflow-y-auto">
        <div ref={intersectionRef} />

        {isFetchingNextPage && <Spinner color="primary" />}

        <div className="column gap-2.5 px-4">
          {allMessages.map(talk => (
            <CheerTalkItem key={`socket-${talk.cheerTalkId}`} {...talk} />
          ))}
        </div>

        <div ref={bottomRef} />
      </div>

      <CheerTalkForm
        gameTeams={game.gameTeams}
        scrollToBottom={scrollToBottomWithDelay}
        gameState={game.state}
      />
    </Fragment>
  );
};
