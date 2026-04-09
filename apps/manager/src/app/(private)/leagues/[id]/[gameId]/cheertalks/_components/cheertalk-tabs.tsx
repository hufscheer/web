'use client';

import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

// TODO: useSuspenseGameCheerTalks로 교체 (API 추가 후)
const AllContent = ({ gameId: _ }: { gameId: number }) => {
  return <CheerTalkList cheerTalks={[]} status="all" />;
};

// TODO: useSuspenseGameCheerTalkReport로 교체 (API 추가 후)
const ReportedContent = ({ gameId: _ }: { gameId: number }) => {
  return <CheerTalkList cheerTalks={[]} status="reported" />;
};

type Props = { gameId: number };

export const GameCheerTalkTabs = ({ gameId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent gameId={gameId} />}
    reportedContent={<ReportedContent gameId={gameId} />}
  />
);
