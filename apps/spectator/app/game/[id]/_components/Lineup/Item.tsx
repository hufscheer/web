import { GamePlayerType } from '@/types/game';

import LineupCaptain from './Captain';
import * as styles from './Lineup.css';

type LineupItemProps = GamePlayerType & {
  whichSide: 'blue' | 'red';
};

export default function LineupItem({
  playerName,
  number,
  isCaptain,
  whichSide,
}: LineupItemProps) {
  return (
    <li className={styles.item.root}>
      <span className={styles.backNumber[whichSide]}>{number}</span>
      <div className={styles.item.playerWrapper}>
        <span className={styles.item.playerCaption}>
          <span className={styles.item.playerName}>{playerName}</span>
          선수
        </span>
      </div>
      <LineupCaptain isCaptain={isCaptain} whichSide={whichSide} />
    </li>
  );
}
