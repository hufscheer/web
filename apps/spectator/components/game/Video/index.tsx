import { AxiosError } from 'axios';
import { ComponentProps } from 'react';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { VIDEO_API_ERROR_MESSAGE } from '@/constants/error';
import { YOUTUBE_VIDEO_BASE_SRC } from '@/constants/videoSrc';

import * as styles from './Video.css';

interface VideoProps extends ComponentProps<'iframe'> {
  videoId: string;
}

export default function Video({ videoId, ...props }: VideoProps) {
  return (
    <iframe
      className={styles.video}
      src={`${YOUTUBE_VIDEO_BASE_SRC}/${videoId}`}
      title="Game Highlight"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      {...props}
    ></iframe>
  );
}

Video.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      VIDEO_API_ERROR_MESSAGE[code as keyof typeof VIDEO_API_ERROR_MESSAGE];
  } else if (error instanceof Error) {
    message = '경기 영상이 등록되지 않았어요!';
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.span}>⚠️ {message}</span>

      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.button}
      >
        새로고침
      </button>
    </div>
  );
};
