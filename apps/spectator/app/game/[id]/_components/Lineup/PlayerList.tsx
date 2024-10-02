import { Fragment } from 'react';

import { GamePlayerType, TeamDirection } from '@/types/game';

import LineupCaptain from './Captain';
import * as styles from './Lineup.css';

type PlayerProps = {
  lineup: GamePlayerType[];
  direction: TeamDirection;
};

export default function LineupPlayerList({ lineup, direction }: PlayerProps) {
  return (
    <ul className={styles.itemsWrapper}>
      {lineup.map(player => (
        <li
          key={player.playerName + player.number}
          className={styles.playerItem[direction]}
        >
          <Fragment>
            <span className={styles.backNumber[direction]}>
              {player.number}
            </span>
            <div className={styles.player.wrapper}>
              <span className={styles.player.name}>{player.playerName}</span>
            </div>
            {player.isCaptain && <div>C</div>}
          </Fragment>

          <LineupCaptain isCaptain={player.isCaptain} direction={direction} />
        </li>
      ))}
    </ul>
  );
}
