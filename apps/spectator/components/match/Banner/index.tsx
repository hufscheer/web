import { FallbackProps } from '@/components/common/ErrorBoundary';
import { MatchCard } from '@/components/common/MatchCard';
import { MatchType } from '@/types/match';

import * as styles from './Banner.css';

export default function MatchBanner(props: MatchType) {
  const [firstTeam, secondTeam] = props.gameTeams;

  return (
    <MatchCard {...props} className={styles.matchBanner.frame}>
      <MatchCard.Label className={styles.matchBanner.label} />
      <div className={styles.matchBanner.cardWrapper}>
        <MatchCard.Background
          viewBox="-3 120 100 50"
          width={150}
          height={200}
          className={styles.matchBanner.background}
        />
        <MatchCard.Team
          teamIndex={firstTeam.order}
          className={styles.matchBanner.team}
        />
        <MatchCard.Score teamIndex={firstTeam.order} />
        <MatchCard.Status />
        <MatchCard.Score teamIndex={secondTeam.order} />
        <MatchCard.Team
          teamIndex={secondTeam.order}
          className={styles.matchBanner.team}
        />
      </div>
    </MatchCard>
  );
}

MatchBanner.ErrorFallback = function ErrorFallback({
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

MatchBanner.Skeleton = function Skeleton() {
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
