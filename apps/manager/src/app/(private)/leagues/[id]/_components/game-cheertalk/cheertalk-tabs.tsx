'use client';

import { useSuspenseInfiniteGamesCheerTalks } from '~/api/queries/useGameCheerTalks';
import { useSuspenseInfiniteGamesCheerTalkReport } from '~/api/queries/useGamesCheerTalkReport';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = ({ gameId }: { gameId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteGamesCheerTalks({ gameId, cursor: 0, size: 10 });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()];
  return (
    <CheerTalkList
      cheerTalks={cheerTalks}
      status="all"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );
};

const ReportedContent = ({ gameId }: { gameId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteGamesCheerTalkReport({ gameId, cursor: 0, size: 10 });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()];
  return (
    <CheerTalkList
      cheerTalks={cheerTalks}
      status="reported"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );
};

type Props = { gameId: number };

export const GameCheerTalkTabs = ({ gameId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent gameId={gameId} />}
    reportedContent={<ReportedContent gameId={gameId} />}
  />
);
