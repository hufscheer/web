import { GamePlayerType } from '@/types/game';

import LineupItem from './Item';
import * as styles from './Lineup.css';

type PlayerProps = {
  lineup: GamePlayerType[];
  whichSide: 'blue' | 'red';
};

export default function LineupPlayerList({ lineup, whichSide }: PlayerProps) {
  return (
    <ul className={styles.lineup.itemsWrapper}>
      {lineup.map((player, idx) => (
        <LineupItem
          key={player.playerName + idx}
          whichSide={whichSide}
          {...player}
        />
      ))}
    </ul>
  );
}
