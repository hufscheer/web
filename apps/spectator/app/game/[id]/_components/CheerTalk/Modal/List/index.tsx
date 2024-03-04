'use client';

import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { FallbackProps } from '@/components/ErrorBoundary';
import { COMMENT_API_ERROR_MESSAGE } from '@/constants/error';
import useInfiniteObserver from '@/hooks/useInfiniteObserver';
import { GameCheerTalkWithTeamInfo } from '@/types/game';

import { errorFallback } from './LIst.css';
import CheerTalkItem from '../Item';

interface CheerTalkListProps {
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  scrollToBottom: () => void;
}

const CheerTalkList = ({
  cheerTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  scrollToBottom,
}: CheerTalkListProps) => {
  const { ref } = useInfiniteObserver<HTMLDivElement>(
    async (entry, observer): Promise<void> => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    },
  );

  useEffect((): void => {
    if (!scrollToBottom) return;

    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <>
      <div ref={ref}></div>
      {cheerTalkList.map(cheerTalk => (
        <CheerTalkItem {...cheerTalk} key={cheerTalk.cheerTalkId} />
      ))}
    </>
  );
};

CheerTalkList.SocketList = function SocketList({
  cheerTalkList,
}: Pick<CheerTalkListProps, 'cheerTalkList'>) {
  return (
    <>
      {cheerTalkList.map(cheerTalk => (
        <CheerTalkItem {...cheerTalk} key={cheerTalk.cheerTalkId} />
      ))}
    </>
  );
};

CheerTalkList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code: string | undefined = error.code;

    message =
      COMMENT_API_ERROR_MESSAGE[code as keyof typeof COMMENT_API_ERROR_MESSAGE];
  } else if (error instanceof Error) {
    message = '댓글 목록을 불러올 수가 없어요!';
  }

  return (
    <div className={errorFallback.wrapper}>
      <span className={errorFallback.span}>⚠️ {message}</span>
      <button onClick={resetErrorBoundary} className={errorFallback.button}>
        새로고침
      </button>
    </div>
  );
};

export default CheerTalkList;
