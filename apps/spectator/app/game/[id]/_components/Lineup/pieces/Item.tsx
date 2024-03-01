import { GamePlayerType } from '@/types/game';

import LineupCaptain from './Captain';
import * as styles from '../Lineup.css';

type LineupItemProps = GamePlayerType & {
  order: number;
};

export default function LineupItem({
  playerName,
  // description,
  number,
  isCaptain,
  order,
}: LineupItemProps) {
  const whichSide = order === 1 ? 'blue' : 'red';
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
