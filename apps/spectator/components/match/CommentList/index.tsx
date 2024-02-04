'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { MatchCommentType } from '@/types/match';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { COMMENT_API_ERROR_MESSAGE } from '@/constants/error';
import useInfiniteObserver from '@/hooks/useInfiniteObserver';

import CommentItem from '../CommentItem';
import { errorFallback } from './CommentLIst.css';

type CommentListProps = {
  commentList: MatchCommentType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  scrollToBottom: () => void;
};

export default function CommentList({
  commentList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  scrollToBottom,
}: CommentListProps) {
  const { ref } = useInfiniteObserver<HTMLDivElement>(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  );

  useEffect(() => {
    if (!scrollToBottom) return;

    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <>
      <div ref={ref}></div>
      {commentList.map(comment => (
        <CommentItem
          {...comment}
          key={comment.commentId}
          order={comment.order}
        />
      ))}
    </>
  );
}

CommentList.SocketList = function SocketList({
  commentList,
}: Pick<CommentListProps, 'commentList'>) {
  return (
    <>
      {commentList.map(comment => (
        <CommentItem
          {...comment}
          key={comment.commentId}
          order={comment.order}
        />
      ))}
    </>
  );
};

CommentList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

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
