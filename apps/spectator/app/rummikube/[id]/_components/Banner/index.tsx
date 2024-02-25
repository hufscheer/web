import { FallbackProps } from '@/components/common/ErrorBoundary';
import { GameCard } from '@/components/common/GameCard';
import useGameById from '@/queries/useGameById';

import * as styles from './Banner.css';

export default function RummiKubGameBanner({ gameId }: { gameId: string }) {
  const { gameDetail } = useGameById(gameId);

  return (
    <GameCard {...gameDetail} className={styles.rkGameBanner.frame}>
      <GameCard.Label className={styles.rkGameBanner.label} />
      <div className={styles.rkGameBanner.cardWrapper}>
        <GameCard.Background
          viewBox="-13 117 120 50"
          width={150}
          height={170}
          className={styles.rkGameBanner.background}
        />
        <GameCard.Status className={styles.rkGameBanner.status} />
        <div className={styles.rkGameBanner.teamWrapper}>
          <div className={styles.rkGameBanner.teamArea}>
            <GameCard.Team teamIndex={1} className={styles.rkGameBanner.team} />
            <GameCard.Score teamIndex={1} />
          </div>
          <div className={styles.rkGameBanner.teamArea}>
            <GameCard.Team teamIndex={2} className={styles.rkGameBanner.team} />
            <GameCard.Score teamIndex={2} />
          </div>
          <div className={styles.rkGameBanner.teamArea}>
            <GameCard.Team teamIndex={3} className={styles.rkGameBanner.team} />
            <GameCard.Score teamIndex={3} />
          </div>
          <div className={styles.rkGameBanner.teamArea}>
            <GameCard.Team teamIndex={4} className={styles.rkGameBanner.team} />
            <GameCard.Score teamIndex={4} />
          </div>
        </div>
        <div className={styles.base} />
      </div>
    </GameCard>
  );
}

RummiKubGameBanner.ErrorFallback = function ErrorFallback({
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

RummiKubGameBanner.Skeleton = function Skeleton() {
  return (
    <GameCard
      className={styles.skeleton.frame}
      gameTeams={[]}
      startTime={''}
      gameQuarter={''}
      gameName={''}
      sportsName={''}
    >
      <div className={styles.skeleton.cardWrapper}>
        <GameCard.Background
          viewBox="-3 120 100 50"
          width={150}
          height={200}
          className={styles.skeleton.background}
        />
      </div>
    </GameCard>
  );
};
