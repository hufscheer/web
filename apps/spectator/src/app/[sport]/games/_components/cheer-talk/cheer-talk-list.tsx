'use client';
import { CloseIcon } from '@hcc/icons';
import { colors, Spinner, Typography } from '@hcc/ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type GameCheerTalkWithTeamInfo, useSuspenseGame } from '~/api';
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
  const NOTICE_DISMISSED_KEY = `cheer-notice-dismissed-${gameId}`;
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const dismissNotice = () => {
    setIsNoticeVisible(false);
    sessionStorage.setItem(NOTICE_DISMISSED_KEY, 'true');
  };

  const showNotice = () => {
    if (sessionStorage.getItem(NOTICE_DISMISSED_KEY)) return;
    setIsNoticeVisible(true);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasFirstScrolled = useRef(false);
  const hasFirstFocused = useRef(false);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setFormHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isNearBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return false;
    return el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight });
  }, []);

  const [scrollToBottomWithDelay] = useTimeout(scrollToBottom, 100);

  const loadPreviousMessages = useThrottle(fetchNextPage, 1000);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (el.scrollTop < 100 && hasNextPage && !isFetching && !isFetchingNextPage) {
      loadPreviousMessages();
    }
  }, [hasNextPage, isFetching, isFetchingNextPage, loadPreviousMessages]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (cheerTalkList.length > 0 && !hasFirstScrolled.current) {
      hasFirstScrolled.current = true;
      scrollToBottomWithDelay();
    }
  }, [cheerTalkList, scrollToBottomWithDelay]);

  useEffect(() => {
    if (socketTalkList.length === 0) return;
    if (isNearBottom()) scrollToBottom();
  }, [socketTalkList, scrollToBottom, isNearBottom]);

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
    <>
      <div ref={scrollContainerRef} className="relative min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner color="primary" />
          </div>
        )}

        <div className="column gap-2">
          {allMessages.map((talk) => (
            <CheerTalkItem key={`talk-${talk.cheerTalkId}`} {...talk} />
          ))}
        </div>
        <div style={{ height: formHeight }} />
      </div>

      <div
        ref={formRef}
        className="pb-safe fixed inset-x-0 bottom-0 z-20 border-t border-neutral-100 bg-white"
      >
        <div className="relative mx-auto w-full max-w-(--app-max-width)">
          {isNoticeVisible && (
            <div className="absolute right-4 bottom-full left-4 z-20 mb-2">
              <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 shadow-lg">
                <Typography fontSize={12} color={colors.neutral700} className="leading-5">
                  타인에게 불쾌감을 주거나 법령을 위반하는 활동을 할 경우, 운영정책에 따라 메시지
                  삭제 및 서비스 이용이 제한 될 수 있습니다.
                </Typography>
                <button
                  type="button"
                  onPointerDown={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={dismissNotice}
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
            onInputFocus={() => {
              showNotice();
              if (!hasFirstFocused.current) {
                hasFirstFocused.current = true;
                scrollToBottom();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
