import { MatchType } from '@/types/match';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { MatchCard } from '@/components/common/MatchCard';

import * as styles from './MatchBanner.css';

export default function RummiKubMatchBanner(match: MatchType) {
  return (
    <MatchCard {...match} className={styles.rkMatchBanner.frame}>
      <MatchCard.Label className={styles.rkMatchBanner.label} />
      <div className={styles.rkMatchBanner.cardWrapper}>
        <MatchCard.Background
          viewBox="-13 117 120 50"
          width={150}
          height={170}
          className={styles.rkMatchBanner.background}
        />
        <MatchCard.Status className={styles.rkMatchBanner.status} />
        <div className={styles.rkMatchBanner.teamWrapper}>
          <div className={styles.rkMatchBanner.teamArea}>
            <MatchCard.Team
              teamIndex={1}
              className={styles.rkMatchBanner.team}
            />
            <MatchCard.Score teamIndex={1} />
          </div>
          <div className={styles.rkMatchBanner.teamArea}>
            <MatchCard.Team
              teamIndex={2}
              className={styles.rkMatchBanner.team}
            />
            <MatchCard.Score teamIndex={2} />
          </div>
          <div className={styles.rkMatchBanner.teamArea}>
            <MatchCard.Team
              teamIndex={3}
              className={styles.rkMatchBanner.team}
            />
            <MatchCard.Score teamIndex={3} />
          </div>
          <div className={styles.rkMatchBanner.teamArea}>
            <MatchCard.Team
              teamIndex={4}
              className={styles.rkMatchBanner.team}
            />
            <MatchCard.Score teamIndex={4} />
          </div>
        </div>
        <div className={styles.base} />
      </div>
    </MatchCard>
  );
}

RummiKubMatchBanner.ErrorFallback = function ErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className={styles.errorFallback.wrapper}>
      <div className={styles.errorFallback.errorInfo}>
        <span>게임 정보를 불러올 수 없어요.</span>
        <span>잠시 후 다시 시도해주세요!</span>
      </div>
      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.button}
      >
        새로고침
      </button>
    </div>
  );
};

RummiKubMatchBanner.Skeleton = function Skeleton() {
  return (
    <MatchCard
      className={styles.skeleton.frame}
      gameTeams={[]}
      startTime={''}
      gameQuarter={''}
      gameName={''}
      sportsName={''}
    >
      <div className={styles.skeleton.cardWrapper}>
        <MatchCard.Background
          viewBox="-3 120 100 50"
          width={150}
          height={200}
          className={styles.skeleton.background}
        />
      </div>
    </MatchCard>
  );
};
