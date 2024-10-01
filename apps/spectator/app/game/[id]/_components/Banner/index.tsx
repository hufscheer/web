import { clsx } from 'clsx';
import { Sofia_Sans } from 'next/font/google';

import useGameById from '@/queries/useGameById';
import { formatTime } from '@/utils/time';

import * as styles from './Banner.css';
import BannerTeam from './Team';

type BannerProps = {
  gameId: string;
};

const sofia = Sofia_Sans({ subsets: ['latin'] });

export default function Banner({ gameId }: BannerProps) {
  const { gameDetail } = useGameById(gameId);
  const [firstTeam, secondTeam] = gameDetail.gameTeams;

  return (
    <div className={styles.root}>
      <BannerTeam team={firstTeam} />
      <div className={styles.gameInfo}>
        <span className={styles.badge}>{gameDetail.gameQuarter}</span>
        <div className={styles.scoreBoard}>
          <span className={clsx(styles.score, sofia.className)}>
            {firstTeam.score}
          </span>
          <div className={styles.colon}>
            <span className={styles.dots} />
            <span className={styles.dots} />
          </div>
          <span className={clsx(styles.score, sofia.className)}>
            {secondTeam.score}
          </span>
        </div>

        <div className={styles.time}>
          <time>{formatTime(gameDetail.startTime, 'YYYY.MM.DD. (ddd)')}</time>
          <time>{formatTime(gameDetail.startTime, 'HH:mm')}</time>
        </div>
      </div>
      <BannerTeam team={secondTeam} />
    </div>
  );
}
