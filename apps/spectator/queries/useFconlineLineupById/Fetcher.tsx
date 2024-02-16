import { ReactNode } from 'react';

import { FconlineInfoType } from '@/api/player';
import { GameLineupType } from '@/types/game';

import { useGameFconlineLineupById } from './query';

export type FconlineLineupType = GameLineupType & FconlineInfoType;

type FconlineLineupFetcherProps = {
  gameId: string;
  children: ({
    mergedUserInfo,
  }: {
    mergedUserInfo: FconlineLineupType[];
  }) => ReactNode;
};

export default function FconlineLineupFetcher({
  gameId,
  children,
}: FconlineLineupFetcherProps) {
  const { fconlineInfo, lineup, fconlineError, error } =
    useGameFconlineLineupById(gameId);

  const mergedUserInfo = fconlineInfo.map((info, index) => ({
    ...info,
    ...lineup[index],
  }));

  if (error) throw error;
  if (fconlineError) throw fconlineError;

  return children({ mergedUserInfo });
}
