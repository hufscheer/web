import { ArrowClockwiseIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { AxiosError } from 'axios';

import { FallbackProps } from '@/components/ErrorBoundary';
import { NotFoundError } from '@/services/errors';

import * as styles from './Timeline.css';

export default function TimelineFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (error instanceof NotFoundError) {
    return (
      <div className={styles.errorFallback.wrapper}>
        <div className={styles.errorFallback.message}>
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <div className={styles.errorFallback.wrapper}>
        <div className={styles.errorFallback.message}>
          연결이 원활하지 않습니다.
        </div>
        <button
          onClick={resetErrorBoundary}
          className={styles.errorFallback.retry}
        >
          재시도
          <Icon source={ArrowClockwiseIcon} size="xs" color="black" />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.message}>
        {error?.message || ''}
      </span>
      <span className={styles.errorFallback.message}>
        잠시 후 다시 시도해주세요.
      </span>
    </div>
  );
}
