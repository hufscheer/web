'use client';
import { Spinner } from '@hcc/ui';
import { useMemo } from 'react';

import { type GameCheerTalkWithTeamInfo, useSuspenseGame } from '~/api';
import { NoticeBanner } from '~/app/org/[orgId]/_components/NoticeBanner';
import { useChatScroll } from '~/app/org/[orgId]/_hooks/useChatScroll';
import { useNewMessageNotifier } from '~/app/org/[orgId]/_hooks/useNewMessageNotifier';
import { useNoticeBanner } from '~/app/org/[orgId]/_hooks/useNoticeBanner';

import { CheerTalkForm } from './cheer-talk-form';
import CheerTalkItem from './cheer-talk-item';

interface CheerTalkListProps {
  gameId: number;
  cheerTalkList: GameCheerTalkWithTeamInfo[];
  socketTalkList: GameCheerTalkWithTeamInfo[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
}

export const CheerTalkList = ({
  gameId,
  cheerTalkList,
  socketTalkList,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}: CheerTalkListProps) => {
  const { data: game } = useSuspenseGame({ gameId });
  const notice = useNoticeBanner(gameId);

  const messages = useMemo(
    () => mergeCheerTalks(cheerTalkList, socketTalkList),
    [cheerTalkList, socketTalkList],
  );

  const scroll = useChatScroll({
    messageCount: messages.length,
    prependKey: cheerTalkList,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  });

  const notifier = useNewMessageNotifier({
    socketTalkList,
    isNearBottom: scroll.isNearBottom,
    scrollToBottom: scroll.scrollToBottom,
  });

  const handleScroll = () => {
    scroll.onScroll();
    notifier.clearIfNearBottom();
  };

  return (
    <>
      <div
        ref={scroll.ref}
        onScroll={handleScroll}
        className="relative min-h-0 flex-1 overflow-y-auto px-4 py-4"
      >
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner color="primary" />
          </div>
        )}

        <div className="column gap-2">
          {messages.map((talk) => (
            <CheerTalkItem key={`talk-${talk.cheerTalkId}`} {...talk} />
          ))}
        </div>
      </div>

      <div className="pb-safe z-20 mx-auto w-full max-w-(--app-max-width) border-t border-neutral-100 bg-white">
        <div className="relative w-full">
          <div className="absolute right-4 bottom-full left-4 z-20 mb-2 flex flex-col gap-2">
            {notice.visible && <NoticeBanner onDismiss={notice.dismiss} />}
            {/* {notifier.preview && (
              <NewMessagePreview message={notifier.preview} onClick={notifier.dismiss} />
            )} */}
          </div>

          <CheerTalkForm
            gameTeams={game.gameTeams}
            gameState={game.state}
            onInputFocus={notice.show}
          />
        </div>
      </div>
    </>
  );
};

/* ----- utils ----- */

export const mergeCheerTalks = (
  fetched: GameCheerTalkWithTeamInfo[],
  socket: GameCheerTalkWithTeamInfo[],
): GameCheerTalkWithTeamInfo[] => {
  const map = new Map<number, GameCheerTalkWithTeamInfo>();

  fetched.forEach((talk) => map.set(talk.cheerTalkId, talk));
  socket.forEach((talk) => map.set(talk.cheerTalkId, talk));

  return Array.from(map.values()).sort((a, b) => a.cheerTalkId - b.cheerTalkId);
};
