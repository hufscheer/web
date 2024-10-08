import { clsx } from 'clsx';
import { Sofia_Sans } from 'next/font/google';

import useGameById from '@/queries/useGameById';
import { formatTime } from '@/utils/time';

import * as styles from './Banner.css';
import { badgeActive } from './Banner.css';
import BannerTeam from './Team';

type BannerProps = {
  gameId: string;
};

const sofia = Sofia_Sans({ subsets: ['latin'] });

export default function Banner({ gameId }: BannerProps) {
  const { gameDetail } = useGameById(gameId);
  const [homeTeam, awayTeam] = gameDetail.gameTeams;

  return (
    <div className={styles.root}>
      <BannerTeam team={homeTeam} />
      <div className={styles.gameInfo}>
        <span
          className={clsx(styles.badge, {
            [badgeActive]: gameDetail.state === 'PLAYING',
          })}
        >
          {gameDetail.gameQuarter}
        </span>
        <div className={styles.scoreBoard}>
          <span className={clsx(styles.score, sofia.className)}>
            {homeTeam.score}
          </span>
          <div className={styles.colon}>
            <span className={styles.dots} />
            <span className={styles.dots} />
          </div>
          <span className={clsx(styles.score, sofia.className)}>
            {awayTeam.score}
          </span>
        </div>

        <div className={styles.time}>
          <time>{formatTime(gameDetail.startTime, 'YYYY.MM.DD. (ddd)')}</time>
          <time>{formatTime(gameDetail.startTime, 'HH:mm')}</time>
        </div>
      </div>
      <BannerTeam team={awayTeam} />
    </div>
  );
}
