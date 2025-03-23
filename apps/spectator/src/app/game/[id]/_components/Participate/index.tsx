import Image from 'next/image';

import PlayerList from '@/src/app/game/[id]/_components/Lineup/PlayerList';
import { useGameLineupById } from '@/src/queries/useGameLineupById';

import * as styles from './styles.css';

type ParticipateProps = {
  gameId: string;
};

const Participate = ({ gameId }: ParticipateProps) => {
  const { data: lineups } = useGameLineupById(gameId);
  const [homeTeam, awayTeam] = lineups;

  return (
    <div className={styles.container}>
      <div className={styles.teamContainer}>
        <div className={styles.team.left}>
          <div className={styles.logoContainer}>
            <Image
              src={homeTeam.logoImageUrl}
              alt={`${homeTeam.teamName} logo image`}
              loading="lazy"
              fill
              className={styles.logoImg}
            />
          </div>
          <span className={styles.teamName.left}>{homeTeam.teamName}</span>
        </div>

        <PlayerList players={homeTeam.starterPlayers} direction={homeTeam.direction} />
      </div>

      <div className={styles.divider} />

      <div className={styles.teamContainer}>
        <div className={styles.team.right}>
          <span className={styles.teamName.right}>{awayTeam.teamName}</span>
          <div className={styles.logoContainer}>
            <Image
              src={awayTeam.logoImageUrl}
              alt={`${awayTeam.teamName} logo image`}
              loading="lazy"
              fill
              className={styles.logoImg}
            />
          </div>
        </div>

        <PlayerList players={awayTeam.starterPlayers} direction={awayTeam.direction} />
      </div>
    </div>
  );
};

export default Participate;
