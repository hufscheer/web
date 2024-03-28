import { track } from '@amplitude/analytics-browser';
import Link from 'next/link';

import { GAME_STATE, TABS_CONFIG } from '@/constants/configs';
import { GameState } from '@/types/game';

import * as styles from './GameList.css';

type GameButtonProps = {
  id: number;
  state: GameState;
  hasVideo: boolean;
};

export default function GameButton({ id, state, hasVideo }: GameButtonProps) {
  if (state === GAME_STATE.SCHEDULED) {
    return null;
  }

  return (
    <div className={styles.gameButtonArea.root}>
      {state === GAME_STATE.PLAYING && (
        <Link
          href={{ pathname: `/game/${id}`, query: { cheer: 'open' } }}
          onClick={() => track(`gameList | cheer button ${id}`)}
          className={styles.gameButtonArea.cheer}
        >
          응원
        </Link>
      )}
      {state === GAME_STATE.FINISHED && hasVideo && (
        <Link
          href={{
            pathname: `/game/${id}`,
            query: { tab: TABS_CONFIG.HIGHLIGHT },
          }}
          onClick={() => track(`gameList | video button ${id}`)}
          className={styles.gameButtonArea.record}
        >
          영상
        </Link>
      )}

      <Link
        href={{
          pathname: `/game/${id}`,
          query: { tab: TABS_CONFIG.TIMELINE },
        }}
        onClick={() => track(`gameList | timeline card ${id}`)}
        className={styles.gameButtonArea.record}
      >
        기록
      </Link>
    </div>
  );
}
