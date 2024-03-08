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
      <span className={styles.banner.teamName}>{firstTeam.gameTeamName}</span>
      <span className={styles.banner.teamScore}>{firstTeam.score}</span>
      <span className={styles.banner.gameQuarterContainer}>
        <span className={styles.banner.gameQuarter}>
          {gameDetail.gameQuarter}
        </span>
        <span className={styles.banner.gameStartTime}>
          {formatTime(gameDetail.startTime, 'hh:mm')}
        </span>
      </span>
      <span className={styles.banner.teamScore}>{secondTeam.score}</span>
      <span className={styles.banner.teamName}>{secondTeam.gameTeamName}</span>
    </div>
  );
}
