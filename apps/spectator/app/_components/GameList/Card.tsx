import Link from 'next/link';

import { GAME_STATE_KR } from '@/constants/configs';
import useTracker from '@/hooks/useTracker';
import { GameListType, GameState } from '@/types/game';
import { formatTime } from '@/utils/time';

import GameButton from './Button';
import { GameCardErrorFallback } from './Error';
import GameInfo from './Info';
import * as styles from './styles.css';

type GameCardProps = {
  info: GameListType;
  state: GameState;
};

export default function GameCard({ info, state }: GameCardProps) {
  const { id, gameTeams, gameName, startTime, videoId } = info;
  const { tracker } = useTracker();

  return (
    <li className={styles.item}>
      <Link
        href={`/game/${id}`}
        onClick={() =>
          tracker(`gameList`, { clickEvent: `${id} ${state} game card` })
        }
      >
        <div className={styles.metadata}>
          <span className={styles.titleContainer}>
            <div className={styles.state[state]}>{GAME_STATE_KR[state]}</div>
            {gameName.split('|')[0]}
          </span>
          <span className={styles.timestamp}>
            {formatTime(startTime, 'YYYY.MM.DD. (ddd) HH:mm')}
          </span>
        </div>

        <div className={styles.scoreContainer}>
          <GameInfo gameTeams={gameTeams} state={state} />
          <GameButton id={id} state={state} hasVideo={!!videoId} />
        </div>
      </Link>
    </li>
  );
}

GameCard.ErrorFallback = GameCardErrorFallback;
