import { useGameLineupById } from '@/queries/useGameLineupById';

import * as styles from './Lineup.css';
import LineupPlayerList from './PlayerList';
import LineupTeam from './Team';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const {
    data: [firstTeam, secondTeam],
  } = useGameLineupById(gameId);

  return (
    <div className={styles.lineup.root}>
      <div className={styles.lineup.split}>
        <LineupTeam team={firstTeam.info} />
        <LineupPlayerList lineup={firstTeam.lineup} whichSide="blue" />
      </div>
      <div className={styles.lineup.split}>
        <LineupTeam team={secondTeam.info} />
        <LineupPlayerList lineup={secondTeam.lineup} whichSide="red" />
      </div>
    </div>
  );
}
