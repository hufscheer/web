import { useContext } from 'react';
import { MatchType } from '@/types/match';

import { MatchContext } from '@/components/common/MatchCard/pieces/Wrapper';

type MatchCardContextType = () => MatchType;

export const useMatchCardContext: MatchCardContextType = () => {
  const matchContext = useContext(MatchContext);

  if (!matchContext) throw new Error('Context가 비었습니다.');

  return matchContext;
};
