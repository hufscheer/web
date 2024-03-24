import useGameById from '@/queries/useGameById';
import { formatTime } from '@/utils/time';

import * as styles from './Banner.css';

type BannerProps = {
  gameId: string;
};

export default function CheerTalkBanner({ gameId }: BannerProps) {
  const { gameDetail } = useGameById(gameId);
  const [firstTeam, secondTeam] = gameDetail.gameTeams;

  return (
    <div className={styles.banner.wrapper}>
      <span className={styles.banner.firstTeamName}>
        {firstTeam.gameTeamName}
      </span>
      <div className={styles.banner.gameInfoArea}>
        <span className={styles.banner.teamScore}>{firstTeam.score}</span>
        <div className={styles.banner.gameQuarterContainer}>
          <span className={styles.banner.gameQuarter}>
            {gameDetail.gameQuarter}
          </span>
          <span className={styles.banner.gameStartTime}>
            {formatTime(gameDetail.startTime, 'hh:mm')}
          </span>
        </div>
        <span className={styles.banner.teamScore}>{secondTeam.score}</span>
      </div>

      <span className={styles.banner.secondTeamName}>
        {secondTeam.gameTeamName}
      </span>
    </div>
  );
}
