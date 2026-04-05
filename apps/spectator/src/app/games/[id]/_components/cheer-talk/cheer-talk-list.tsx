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

  const bottomRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  const [formHeight, setFormHeight] = useState(88);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, []);

  const [scrollToBottomWithDelay] = useTimeout(scrollToBottom, 100);

  const loadPreviousMessages = useThrottle(fetchNextPage, 1000);

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      loadPreviousMessages();
    }
  });

  useEffect(() => {
    if (!formWrapperRef.current) return;

    const updateHeight = () => {
      setFormHeight(formWrapperRef.current?.offsetHeight ?? 88);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(formWrapperRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (socketTalkList.length === 0) return;
    scrollToBottom();
  }, [socketTalkList, scrollToBottom]);

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
      <div className="relative w-full px-4 py-4" style={{ paddingBottom: formHeight + 16 }}>
        <div ref={intersectionRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner color="primary" />
          </div>
        )}

        <div className="column gap-2.5">
          {allMessages.map((talk) => (
            <CheerTalkItem key={`talk-${talk.cheerTalkId}`} {...talk} />
          ))}
        </div>

        <div ref={bottomRef} />
      </div>

      <div
        ref={formWrapperRef}
        className="pb-safe fixed right-0 bottom-0 left-0 z-20 border-t border-neutral-100 bg-white"
      >
        <div className="max-w-screen-sm relative mx-auto w-full">
          {isNoticeVisible && (
            <div className="absolute right-4 bottom-full left-4 z-20 mb-2">
              <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 shadow-lg">
                <Typography fontSize={12} color={colors.neutral700} className="leading-5">
                  타인에게 불쾌감을 주거나 법령을 위반하는 활동을 할 경우, 운영정책에 따라 메시지
                  삭제 및 서비스 이용이 제한 될 수 있습니다.
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

          <CheerTalkForm
            gameTeams={game.gameTeams}
            scrollToBottom={scrollToBottomWithDelay}
            gameState={game.state}
            onInputFocus={() => {}}
          />
        </div>
      </div>
    </Fragment>
  );
};
