import { useGameCheer } from '@hcc/api';

import * as styles from './styles.css';
import CheerTeamBox from './TeamBox';

type CheerVSProps = {
  gameId: string;
};

export default function CheerVS({ gameId }: CheerVSProps) {
  const { homeTeam, awayTeam } = useGameCheer(gameId);
  const cheerCount: number = homeTeam.cheerCount + awayTeam.cheerCount;

  return (
    <div className={styles.root}>
      <CheerTeamBox {...homeTeam} gameId={gameId} direction="left" fullCheerCount={cheerCount} />
      <div className={styles.empty}>
        <div className={styles.vs}>VS</div>
      </div>
      <CheerTeamBox {...awayTeam} gameId={gameId} direction="right" fullCheerCount={cheerCount} />
    </div>
  );
}
