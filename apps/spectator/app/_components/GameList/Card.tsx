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
  const { id, gameTeams, gameName, startTime } = info;

  return (
    <div className={styles.cardRoot[state]}>
      <GameMetadata state={state} gameName={gameName} startTime={startTime} />

      <div className={styles.gameContentArea}>
        <GameInfo gameTeams={gameTeams} gameId={id} state={state} />
        <GameButton id={id} state={state} />
      </div>
    </div>
  );
}

GameCard.ErrorFallback = GameCardErrorFallback;
