import Image from 'next/image';

import { useGameLineupById } from '@/queries/useGameLineupById';

import LineupPlayerList from './PlayerList';
import * as styles from './styles.css';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const { data: lineups } = useGameLineupById(gameId);
  const [firstTeam, secondTeam] = lineups;

  return (
    <div className={styles.lineup}>
      <div className={styles.split}>
        <div className={styles.team.left}>
          <Image
            src={firstTeam.logoImageUrl}
            alt={`${firstTeam.teamName} logo image`}
            width={28}
            height={28}
            loading="lazy"
          />
          <span className={styles.teamName}>{firstTeam.teamName}</span>
        </div>

        <LineupPlayerList
          lineup={firstTeam.starterPlayers}
          direction={firstTeam.direction}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.split}>
        <div className={styles.team.right}>
          <span className={styles.teamName} style={{ textAlign: 'end' }}>
            {secondTeam.teamName}
          </span>
          <Image
            src={secondTeam.logoImageUrl}
            alt={`${secondTeam.teamName} logo image`}
            width={28}
            height={28}
            loading="lazy"
          />
        </div>

        <LineupPlayerList
          lineup={secondTeam.starterPlayers}
          direction={secondTeam.direction}
        />
      </div>
    </div>
  );
}
