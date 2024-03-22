import { GamePlayerType } from '@/types/game';

import LineupCaptain from './Captain';
import * as styles from './Lineup.css';

type PlayerProps = {
  lineup: GamePlayerType[];
  direction: 'left' | 'right';
};

export default function LineupPlayerList({ lineup, direction }: PlayerProps) {
  return (
    <ul className={styles.lineup.itemsWrapper}>
      {lineup.map(player => (
        <li
          key={player.playerName + player.number}
          className={styles.player.root}
        >
          <span className={styles.backNumber[direction]}>{player.number}</span>
          <div className={styles.player.wrapper}>
            <span className={styles.player.name}>{player.playerName}</span>
            <span className={styles.player.caption}>선수</span>
          </div>

          <LineupCaptain isCaptain={player.isCaptain} direction={direction} />
        </li>
      ))}
    </ul>
  );
}
