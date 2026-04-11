'use client';

import { useSuspenseGamesCheerTalks } from '~/api/queries/useGameCheerTalks';
import { useSuspenseGamesCheerTalkReport } from '~/api/queries/useGamesCheerTalkReport';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = ({ gameId }: { gameId: number }) => {
  const { data } = useSuspenseGamesCheerTalks({ gameId, cursor: 1, size: 20 });
  return <CheerTalkList cheerTalks={data} status="all" />;
};

const ReportedContent = ({ gameId }: { gameId: number }) => {
  const { data } = useSuspenseGamesCheerTalkReport({ gameId, cursor: 1, size: 20 });
  return <CheerTalkList cheerTalks={data} status="reported" />;
};

type Props = { gameId: number };

export const GameCheerTalkTabs = ({ gameId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent gameId={gameId} />}
    reportedContent={<ReportedContent gameId={gameId} />}
  />
);
