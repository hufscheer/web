import Link from 'next/link';

import { GameState } from '@/types/game';

import * as styles from './GameList.css';

type GameButtonProps = {
  id: number;
  state: GameState;
};

export default function GameButton({ id, state }: GameButtonProps) {
  if (state === 'scheduled') {
    return null;
  }

  return (
    <div className={styles.gameButtonArea.root}>
      {state === 'playing' && (
        <Link
          href={{ pathname: `/game/${id}`, query: { cheer: 'open' } }}
          className={styles.gameButtonArea.cheer}
        >
          응원
        </Link>
      )}
      <Link
        href={{ pathname: `/game/${id}`, query: { tab: 'timeline' } }}
        className={styles.gameButtonArea.record}
      >
        기록
      </Link>
    </div>
  );
}
