import { FallbackProps } from '@/components/common/ErrorBoundary';
import { GameCard } from '@/components/common/GameCard';
import { GameType } from '@/types/game';

import * as styles from './Banner.css';

export default function GameBanner(props: GameType) {
  const [firstTeam, secondTeam] = props.gameTeams;

  return (
    <GameCard {...props} className={styles.gameBanner.frame}>
      <GameCard.Label className={styles.gameBanner.label} />
      <div className={styles.gameBanner.cardWrapper}>
        <GameCard.Background
          viewBox="-3 120 100 50"
          width={150}
          height={200}
          className={styles.gameBanner.background}
        />
        <GameCard.Team
          teamIndex={firstTeam.order}
          className={styles.gameBanner.team}
        />
        <GameCard.Score teamIndex={firstTeam.order} />
        <GameCard.Status />
        <GameCard.Score teamIndex={secondTeam.order} />
        <GameCard.Team
          teamIndex={secondTeam.order}
          className={styles.gameBanner.team}
        />
      </div>
    </GameCard>
  );
}

GameBanner.ErrorFallback = function ErrorFallback({
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

GameBanner.Skeleton = function Skeleton() {
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
