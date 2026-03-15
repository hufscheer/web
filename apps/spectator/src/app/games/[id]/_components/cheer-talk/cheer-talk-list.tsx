'use client';
import { CloseIcon } from '@hcc/icons';
import { colors, Spinner, Typography } from '@hcc/ui';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

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

    const timers = [100].map((delay) => setTimeout(scrollToBottom, delay));

    return () => timers.forEach(clearTimeout);
  }, [cheerTalkList.length, socketTalkList.length, scrollToBottom]);

  useEffect(() => {
    handleNewMessages();
  }, [cheerTalkList, socketTalkList, handleNewMessages]);

  useEffect(() => {
    return handleInitialScroll();
  }, [handleInitialScroll]);

  const allMessages = useMemo(() => {
    const messageMap = new Map<number, GameCheerTalkWithTeamInfo>();
    cheerTalkList.forEach((talk) => {
      messageMap.set(talk.cheerTalkId, talk);
    });
    socketTalkList.forEach((talk) => {
      messageMap.set(talk.cheerTalkId, talk);
    });
    return Array.from(messageMap.values()).sort((a, b) => a.cheerTalkId - b.cheerTalkId);
  }, [cheerTalkList, socketTalkList]);

  return (
    <Fragment>
      <div ref={scrollRef} className="scrollbar-hide relative w-full flex-1 overflow-y-auto">
        <div ref={intersectionRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner color="primary" />
          </div>
        )}

        <div className="column gap-2.5 px-4 py-4">
          {allMessages.map((talk) => (
            <CheerTalkItem key={`talk-${talk.cheerTalkId}`} {...talk} />
          ))}
        </div>

        <div ref={bottomRef} />
      </div>
      {isNoticeVisible && (
        <div className="right-4 bottom-2 left-4 z-20 mx-4 mb-2">
          <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 shadow-lg">
            <Typography fontSize={12} color={colors.neutral700} className="leading-5">
              타인에게 불쾌감을 주거나 법령을 위반하는 활동을 할 경우, 운영정책에 따라 메시지 삭제
              및 서비스 이용이 제한 될 수 있습니다.
            </Typography>
            <button
              type="button"
              onClick={() => setIsNoticeVisible(false)}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        </div>
      )}
      <div className="pb-safe flex-shrink-0 border-t border-neutral-100 bg-white">
        <CheerTalkForm
          gameTeams={game.gameTeams}
          scrollToBottom={scrollToBottomWithDelay}
          gameState={game.state}
          onInputFocus={() => setIsNoticeVisible(true)}
        />
      </div>
    </Fragment>
  );
};
