'use client';

import { useCheerTalkStream } from '~/app/org/[orgId]/_hooks/useCheerTalkStream';

import { CheerTalkList } from './cheer-talk-list';
import { CheerTalkTimeline } from './cheer-talk-timeline';

interface Props {
  gameId: number;
}

export const CheerTalk = ({ gameId }: Props) => {
  const stream = useCheerTalkStream(gameId);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-shrink-0">
        <CheerTalkTimeline gameId={gameId} />
      </div>

      <CheerTalkList gameId={gameId} {...stream} />
    </div>
  );
};
