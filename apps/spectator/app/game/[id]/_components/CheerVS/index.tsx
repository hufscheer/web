import { useCheerVSById } from '@/queries/useCheerVSById';

import * as styles from './CheerVS.css';
import CheerTeamBox from './TeamBox';

type CheerVSProps = {
  gameId: string;
};

export default function CheerVS({ gameId }: CheerVSProps) {
  const { firstTeam, secondTeam } = useCheerVSById(gameId);
  const fullCheerCount = firstTeam.cheerCount + secondTeam.cheerCount;

  return (
    <div className={styles.root}>
      <CheerTeamBox
        {...firstTeam}
        gameId={gameId}
        direction="left"
        fullCheerCount={fullCheerCount}
      />
      <div className={styles.empty}>
        <div className={styles.vs}>VS</div>
      </div>
      <CheerTeamBox
        gameId={gameId}
        {...secondTeam}
        direction="right"
        fullCheerCount={fullCheerCount}
      />
    </div>
  );
}
