'use client';
import { CloseIcon } from '@hcc/icons';
import { colors, Spinner, Typography } from '@hcc/ui';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { type GameCheerTalkWithTeamInfo, useSuspenseGame } from '~/api';
import { useThrottle } from '~/hooks/useThrottle';

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
  const [newMessage, setNewMessage] = useState<GameCheerTalkWithTeamInfo | null>(null);

  const dismissNotice = () => {
    setIsNoticeVisible(false);
    sessionStorage.setItem(NOTICE_DISMISSED_KEY, 'true');
  };

  const showNotice = () => {
    if (sessionStorage.getItem(NOTICE_DISMISSED_KEY)) return;
    setIsNoticeVisible(true);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const didInitialScrollRef = useRef(false);
  const prevScrollHeightRef = useRef<number | null>(null);
  const lastSeenSocketIdRef = useRef<number | null>(null);

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return false;
    return el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  const dismissNewMessage = useCallback(() => {
    setNewMessage(null);
    scrollToBottom();
  }, [scrollToBottom]);

  const loadPreviousMessages = useThrottle(() => {
    const el = scrollRef.current;
    if (el) prevScrollHeightRef.current = el.scrollHeight;
    fetchNextPage();
  }, 1000);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop < 100 && hasNextPage && !isFetching && !isFetchingNextPage) {
      loadPreviousMessages();
    }
    if (newMessage && isNearBottom()) {
      setNewMessage(null);
    }
  }, [hasNextPage, isFetching, isFetchingNextPage, loadPreviousMessages, isNearBottom, newMessage]);

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

  // 최초 렌더링 시 가장 하단으로 스크롤 (1회)
  useLayoutEffect(() => {
    if (didInitialScrollRef.current) return;
    if (allMessages.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    didInitialScrollRef.current = true;
  }, [allMessages.length]);

  // 이전 페이지 prepend 시 스크롤 위치 보존
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (prevScrollHeightRef.current === null) return;
    const diff = el.scrollHeight - prevScrollHeightRef.current;
    if (diff > 0) el.scrollTop += diff;
    prevScrollHeightRef.current = null;
  }, [cheerTalkList]);

  // 새 소켓 메시지: 하단 근처면 자동 스크롤, 아니면 미리보기 노출
  useEffect(() => {
    if (socketTalkList.length === 0) return;
    const last = socketTalkList[socketTalkList.length - 1];
    if (lastSeenSocketIdRef.current === last.cheerTalkId) return;
    lastSeenSocketIdRef.current = last.cheerTalkId;

    if (isNearBottom()) {
      scrollToBottom();
      setNewMessage(null);
    } else {
      setNewMessage(last);
    }
  }, [socketTalkList, isNearBottom, scrollToBottom]);

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative min-h-0 flex-1 overflow-y-auto px-4 py-4"
      >
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
      </div>

      <div className="pb-safe z-20 mx-auto w-full max-w-(--app-max-width) border-t border-neutral-100 bg-white">
        <div className="relative w-full">
          <div className="absolute right-4 bottom-full left-4 z-20 mb-2 flex flex-col gap-2">
            {isNoticeVisible && (
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
            )}

            {newMessage && (
              <button
                type="button"
                onClick={dismissNewMessage}
                className="animate-in fade-in slide-in-from-bottom-2 flex w-full cursor-pointer items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 text-left shadow-lg"
              >
                <Typography fontSize={12} color={colors.neutral500} className="shrink-0">
                  새 메시지
                </Typography>
                <Typography
                  fontSize={13}
                  color={colors.neutral800}
                  className="flex-1 truncate"
                  asChild
                >
                  <span>{newMessage.content}</span>
                </Typography>
                <Typography fontSize={12} color={colors.primary500} className="shrink-0" asChild>
                  <span>↓</span>
                </Typography>
              </button>
            )}
          </div>

          <CheerTalkForm
            gameTeams={game.gameTeams}
            scrollToBottom={scrollToBottom}
            gameState={game.state}
            onInputFocus={showNotice}
          />
        </div>
      </div>
    </>
  );
};
