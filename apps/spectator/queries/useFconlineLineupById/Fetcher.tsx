import { ReactNode } from 'react';

import { FconlineInfoType } from '@/api/player';
import { MatchLineupType } from '@/types/match';

import { useMatchFconlineLineupById } from './query';

export type FconlineLineupType = MatchLineupType & FconlineInfoType;

type FconlineLineupFetcherProps = {
  matchId: string;
  children: ({
    mergedUserInfo,
  }: {
    mergedUserInfo: FconlineLineupType[];
  }) => ReactNode;
};

export default function FconlineLineupFetcher({
  matchId,
  children,
}: FconlineLineupFetcherProps) {
  const { fconlineInfo, lineup, fconlineError, error } =
    useMatchFconlineLineupById(matchId);

  const mergedUserInfo = fconlineInfo.map((info, index) => ({
    ...info,
    ...lineup[index],
  }));

  if (error) throw error;
  if (fconlineError) throw fconlineError;

  return children({ mergedUserInfo });
}
