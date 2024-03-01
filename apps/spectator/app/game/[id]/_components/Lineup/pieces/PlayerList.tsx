import { GamePlayerType } from '@/types/game';

import LineupItem from './Item';
import * as styles from '../Lineup.css';

type PlayerProps = {
  lineup: GamePlayerType[];
  order: number;
};

export default function LineupPlayerList({ lineup, order }: PlayerProps) {
  return (
    <ul className={styles.lineup.itemsWrapper}>
      {lineup.map((player, idx) => (
        <LineupItem key={player.playerName + idx} order={order} {...player} />
      ))}
    </ul>
  );
}
