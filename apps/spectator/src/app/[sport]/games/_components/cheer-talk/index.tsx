'use client';

import type { SportType } from '~/api';

import { CheerTalkList } from './cheer-talk-list';
import { CheerTalkTimeline } from './cheer-talk-timeline';
import { useCheerTalkStream } from './hooks/useCheerTalkStream';

interface Props {
  gameId: number;
  sportType: SportType;
}

export const CheerTalk = ({ gameId, sportType }: Props) => {
  const stream = useCheerTalkStream(gameId);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-shrink-0">
        <CheerTalkTimeline gameId={gameId} sportType={sportType} />
      </div>

      <CheerTalkList gameId={gameId} {...stream} />
    </div>
  );
};
