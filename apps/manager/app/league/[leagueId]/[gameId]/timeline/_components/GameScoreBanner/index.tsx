import { GameTeamType, GameType } from '@hcc/api';
import { clsx } from 'clsx';
import Image from 'next/image';

import * as styles from './styles.css';

type GameScoreBannerProps = {
  game: GameType;
};

const GameScoreBanner = ({ game }: GameScoreBannerProps) => {
  const home: GameTeamType = game.gameTeams[0];
  const away: GameTeamType = game.gameTeams[1];

  const homeIsWinner = home.score > away.score;
  const awayIsWinner = away.score > home.score;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.teamContainer}>
            <p className={styles.teamName}>{home.gameTeamName}</p>
            <div className={styles.teamLogo}>
              <Image
                src={home.logoImageUrl}
                alt={home.gameTeamName}
                width={22}
                height={22}
              />
            </div>

            <p
              className={clsx(styles.homeScore, {
                [styles.losingScore]: !homeIsWinner,
              })}
            >
              {home.score}
            </p>
          </div>
          <span className={styles.colon}>:</span>
          <div className={clsx(styles.teamContainer, styles.awayTeamContainer)}>
            <p
              className={clsx(styles.awayScore, {
                [styles.losingScore]: !awayIsWinner,
              })}
            >
              {away.score}
            </p>

            <div className={styles.teamLogo}>
              <Image
                src={away.logoImageUrl}
                alt={away.gameTeamName}
                width={22}
                height={22}
              />
            </div>
            <p className={styles.teamName}>{away.gameTeamName}</p>
          </div>
        </div>

        {/* PS */}
        {/*<div className={clsx(styles.inner, styles.psContainer)}>*/}
        {/*  <p className={clsx({ [styles.losingScore]: !homeIsWinner })}>(1</p>*/}
        {/*  <span className={styles.colon}>:</span>*/}
        {/*  <p className={clsx({ [styles.losingScore]: !awayIsWinner })}>3)</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default GameScoreBanner;
