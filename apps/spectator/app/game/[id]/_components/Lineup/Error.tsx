import { ArrowClockwiseIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { AxiosError } from 'axios';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { LINEUP_API_ERROR_MESSAGE } from '@/constants/error';

import * as styles from './Lineup.css';

export default function LineupFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      LINEUP_API_ERROR_MESSAGE[code as keyof typeof LINEUP_API_ERROR_MESSAGE];
  } else if (error instanceof Error) {
    message = '해당 경기의 선수 선발명단\n업데이트 전입니다.';
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.span}>{message}</span>

      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.button}
      >
        재시도
        <Icon
          source={ArrowClockwiseIcon}
          size="xs"
          className={styles.errorFallback.icon}
        />
      </button>
    </div>
  );
}
