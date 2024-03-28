import useGameById from '@/queries/useGameById';
import { formatTime } from '@/utils/time';

import * as styles from './Banner.css';
import BannerTeam from './Team';

type BannerProps = {
  gameId: string;
};

export default function Banner({ gameId }: BannerProps) {
  const { gameDetail } = useGameById(gameId);
  const [firstTeam, secondTeam] = gameDetail.gameTeams;

  return (
    <div className={styles.root}>
      <BannerTeam team={firstTeam} />
      <div className={styles.scoreBoard}>
        <span className={styles.score}>{firstTeam.score}</span>
        <div className={styles.gameInfo}>
          <span className={styles.badge}>{gameDetail.gameQuarter}</span>
          <span className={styles.round}>{gameDetail.gameName}</span>
          <time className={styles.time}>
            {formatTime(gameDetail.startTime, 'MM.DD. HH:mm')}
          </time>
        </div>
        <span className={styles.score}>{secondTeam.score}</span>
      </div>
      <BannerTeam team={secondTeam} />
    </div>
  );
}
