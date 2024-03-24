import { GameListType, GameState } from '@/types/game';

import GameButton from './Button';
import { GameCardErrorFallback } from './Error';
import * as styles from './GameList.css';
import GameInfo from './Info';
import GameMetadata from './Metadata';

type GameCardProps = {
  info: GameListType;
  state: GameState;
};

export default function GameCard({ info, state }: GameCardProps) {
  const { id, gameTeams, gameName, startTime, videoId } = info;

  return (
    <li className={styles.cardRoot[state]}>
      <GameMetadata state={state} gameName={gameName} startTime={startTime} />

      <div className={styles.gameContentArea}>
        <GameInfo gameTeams={gameTeams} gameId={id} state={state} />
        <GameButton id={id} state={state} hasVideo={!!videoId} />
      </div>
    </li>
  );
}

GameCard.ErrorFallback = GameCardErrorFallback;
