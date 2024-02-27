import useGameById from '@/queries/useGameById';
import { formatTime } from '@/utils/time';

import * as styles from './Banner.css';

interface HeaderProps {
  gameId: string;
}

const Banner = ({ gameId }: HeaderProps) => {
  const { gameDetail } = useGameById(gameId);
  const [firstTeam, secondTeam] = gameDetail.gameTeams;

  return (
    <div className={styles.banner}>
      <span className={styles.teamName}>{firstTeam.gameTeamName}</span>
      <span className={styles.teamScore}>{firstTeam.score}</span>
      <span className={styles.gameQuarterContainer}>
        <span className={styles.gameQuarter}>{gameDetail.gameQuarter}</span>
        <span className={styles.gameStartTime}>
          {formatTime(gameDetail.startTime, 'hh:mm')}
        </span>
      </span>
      <span className={styles.teamScore}>{secondTeam.score}</span>
      <span className={styles.teamName}>{secondTeam.gameTeamName}</span>
    </div>
  );
};

export default Banner;
