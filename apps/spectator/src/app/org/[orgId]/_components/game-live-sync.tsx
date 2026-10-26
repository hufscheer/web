'use client';

import { useGameTimelineSync } from '~/app/org/[orgId]/_hooks/useGameTimelineSync';

type Props = {
  gameId: number;
};

export const GameLiveSync = ({ gameId }: Props) => {
  useGameTimelineSync(gameId);

  return null;
};
