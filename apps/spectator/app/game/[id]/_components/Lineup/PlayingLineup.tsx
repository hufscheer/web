import { useGameLineupPlaying } from '@hcc/api';
import { clsx } from 'clsx';

import PlayerList from './PlayerList';
import * as styles from './styles.css';

type StartingProps = {
  gameId: string;
};

export const PlayingLineup = ({ gameId }: StartingProps) => {
  const { data } = useGameLineupPlaying(gameId);

  if (!data) return null;

  const [homeTeam, awayTeam] = data;

  return (
    <div className={clsx(styles.container, styles.starterContainer)}>
      <div className={styles.teamContainer}>
        <div className={styles.team.left}>
          {/*<Image*/}
          {/*  src={homeTeam.logoImageUrl}*/}
          {/*  alt={`${homeTeam.teamName} logo image`}*/}
          {/*  width={28}*/}
          {/*  height={28}*/}
          {/*  loading="lazy"*/}
          {/*/>*/}
          <span className={styles.teamName.left}>{homeTeam.teamName}</span>
        </div>

        <PlayerList players={homeTeam.gameTeamPlayers} direction="left" />
      </div>

      <div className={styles.divider} />

      <div className={styles.teamContainer}>
        <div className={styles.team.right}>
          <span className={styles.teamName.right}>{awayTeam.teamName}</span>
          {/*<Image*/}
          {/*  src={awayTeam.logoImageUrl}*/}
          {/*  alt={`${awayTeam.teamName} logo image`}*/}
          {/*  width={28}*/}
          {/*  height={28}*/}
          {/*  loading="lazy"*/}
          {/*/>*/}
        </div>

        <PlayerList players={awayTeam.gameTeamPlayers} direction="right" />
      </div>
    </div>
  );
};
