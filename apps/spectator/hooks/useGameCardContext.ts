import { useContext } from 'react';

import { GameContext } from '@/components/common/GameCard/pieces/Wrapper';
import { GameType } from '@/types/game';

type GameCardContextType = () => GameType;

export const useGameCardContext: GameCardContextType = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) throw new Error('Context가 비었습니다.');

  return gameContext;
};
