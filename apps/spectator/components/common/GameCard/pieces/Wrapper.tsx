import { clsx } from 'clsx';
import { createContext, ReactNode } from 'react';

import { GameType } from '@/types/game';

import * as styles from './Wrapper.css';

type GameProps = GameType & {
  children: ReactNode;
  className?: string;
};

export const GameContext = createContext<GameType>({} as GameType);

export default function GameWrapper({
  children,
  className,
  ...props
}: GameProps) {
  return (
    <GameContext.Provider value={props}>
      <div className={clsx(className, styles.gameContext)}>{children}</div>
    </GameContext.Provider>
  );
}
