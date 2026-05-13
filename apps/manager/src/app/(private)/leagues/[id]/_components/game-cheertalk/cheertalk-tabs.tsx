'use client';

import { useSuspenseInfiniteGamesCheerTalks } from '~/api/queries/useGameCheerTalks';
import { useSuspenseInfiniteGamesCheerTalkReport } from '~/api/queries/useGamesCheerTalkReport';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';
import { flattenCheerTalkPages } from '~/utils/cheer-talk';

const AllContent = ({ gameId, leagueId }: { gameId: number; leagueId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteGamesCheerTalks({ gameId, cursor: 0, size: 10 });
  const cheerTalks = flattenCheerTalkPages(data.pages).map((t) => ({ ...t, leagueId, gameId }));
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

const ReportedContent = ({ gameId, leagueId }: { gameId: number; leagueId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteGamesCheerTalkReport({ gameId, cursor: 0, size: 10 });
  const cheerTalks = flattenCheerTalkPages(data.pages).map((t) => ({ ...t, leagueId, gameId }));
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

type Props = { gameId: number; leagueId: number };

export const GameCheerTalkTabs = ({ gameId, leagueId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent gameId={gameId} leagueId={leagueId} />}
    reportedContent={<ReportedContent gameId={gameId} leagueId={leagueId} />}
  />
);
