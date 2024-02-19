import { CrossIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { GameType } from '@/types/game';
import { parseTimeString } from '@/utils/time';

import * as styles from './Banner.css';

interface HeaderProps {
  game: GameType;
  onClose: () => void;
}

const Banner = ({ game, onClose }: HeaderProps) => {
  const [firstTeam, secondTeam] = game.gameTeams;
  const { hours, minutes } = parseTimeString(game.startTime);

  return (
    <>
      <div className={styles.banner}>
        <span className={styles.teamName}>{firstTeam.gameTeamName}</span>
        <span className={styles.teamScore}>{firstTeam.score}</span>
        <span className={styles.gameQuarterContainer}>
          <span className={styles.gameQuarter}>{game.gameQuarter}</span>
          <span className={styles.gameStartTime}>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}
          </span>
        </span>
        <span className={styles.teamScore}>{secondTeam.score}</span>
        <span className={styles.teamName}>{secondTeam.gameTeamName}</span>

        {/* close */}
        <button className={styles.headerCloseButton} onClick={onClose}>
          <Icon source={CrossIcon} className={styles.headerCloseIcon} />
        </button>
      </div>
    </>
  );
};

export default Banner;
