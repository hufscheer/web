import { ArrowClockwiseIcon, WhistlingIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { AxiosError } from 'axios';

import { FallbackProps } from '@/components/ErrorBoundary';
import { NotFoundError } from '@/services/errors';

import * as styles from './Highlight.css';

export default function HighlightFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (error instanceof NotFoundError) {
    return (
      <div className={styles.errorFallback.wrapper}>
        <div className={styles.errorFallback.message}>
          <Icon source={WhistlingIcon} size="sm" />
          {error.message}
        </div>
      </div>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <div className={styles.errorFallback.wrapper}>
        <div className={styles.errorFallback.message}>
          <Icon source={WhistlingIcon} size="sm" />
          {error.message}
        </div>
        <button>다시 시도</button>
      </div>
    );
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.message}>
        {error?.message || ''}
      </span>

      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.retry}
      >
        재시도
        <Icon source={ArrowClockwiseIcon} size="xs" color="gray" />
      </button>
    </div>
  );
}
