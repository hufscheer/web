import { AxiosError } from 'axios';
import { MatchTimelineType } from '@/types/match';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { TIMELINE_API_ERROR_MESSAGE } from '@/constants/error';

import RecordItem from '../RecordItem';
import * as styles from './RecordList.css';

export default function RecordList({
  gameQuarter,
  records,
}: MatchTimelineType) {
  return (
    <>
      <div className={styles.recordList.title}>{gameQuarter}</div>
      <ol className={styles.recordList.list}>
        {records.map(record => (
          <RecordItem key={record.scoredAt} {...record} />
        ))}
      </ol>
    </>
  );
}

RecordList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      TIMELINE_API_ERROR_MESSAGE[
        code as keyof typeof TIMELINE_API_ERROR_MESSAGE
      ];
  } else if (error instanceof Error) {
    message = '타임라인이 등록되지 않았어요!';
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
