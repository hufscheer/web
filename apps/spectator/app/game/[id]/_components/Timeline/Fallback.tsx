import { WhistlingIcon } from '@hcc/icons';
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
          <Icon source={WhistlingIcon} size="sm" />
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <div className={styles.errorFallback.wrapper}>
        <div className={styles.errorFallback.message}>
          <span>
            네트워크 에러가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </span>
        </div>
        <button onClick={resetErrorBoundary}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <div className={styles.errorFallback.message}>
        <span>알 수 없는 오류가 발생했습니다.</span>
      </div>
      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.retry}
      >
        다시 시도
      </button>
    </div>
  );
}
