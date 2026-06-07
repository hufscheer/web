import { useCallback, useLayoutEffect, useRef } from 'react';

import { useThrottle } from '~/hooks/useThrottle';

type Params = {
  messageCount: number;
  prependKey: unknown;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useChatScroll = ({
  messageCount,
  prependKey,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
}: Params) => {
  const ref = useRef<HTMLDivElement>(null);
  const didInitialScrollRef = useRef(false);
  const prevScrollHeightRef = useRef<number | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    scrollToEnd(el);
  }, []);

  const isNearBottom = useCallback(() => {
    const el = ref.current;
    return el ? isNearBottomOf(el) : false;
  }, []);

  const loadPreviousMessages = useThrottle(() => {
    const el = ref.current;
    if (el) prevScrollHeightRef.current = captureScrollHeight(el);
    fetchNextPage();
  }, 1000);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (isNearTopOf(el) && hasNextPage && !isFetching && !isFetchingNextPage) {
      loadPreviousMessages();
    }
  }, [hasNextPage, isFetching, isFetchingNextPage, loadPreviousMessages]);

  // 최초 렌더링 시 1회 하단으로 이동
  useLayoutEffect(() => {
    if (didInitialScrollRef.current) return;
    if (messageCount === 0) return;
    const el = ref.current;
    if (!el) return;
    scrollToEnd(el);
    didInitialScrollRef.current = true;
  }, [messageCount]);

  // 이전 페이지 prepend 시 스크롤 위치 보존
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prevScrollHeightRef.current === null) return;
    const diff = el.scrollHeight - prevScrollHeightRef.current;
    if (diff > 0) el.scrollTop += diff;
    prevScrollHeightRef.current = null;
  }, [prependKey]);

  return { ref, scrollToBottom, isNearBottom, onScroll };
};

/* ----- utils ----- */

const NEAR_BOTTOM_THRESHOLD = 100;
const NEAR_TOP_THRESHOLD = 100;

const isNearBottomOf = (el: HTMLElement, threshold = NEAR_BOTTOM_THRESHOLD) =>
  el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

const isNearTopOf = (el: HTMLElement, threshold = NEAR_TOP_THRESHOLD) => el.scrollTop < threshold;

const scrollToEnd = (el: HTMLElement) => {
  el.scrollTop = el.scrollHeight;
};

const captureScrollHeight = (el: HTMLElement) => el.scrollHeight;
