'use client';

import { useSuspenseGamesCheerTalkBlock } from '~/api/queries/useGamesCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

type Props = { gameId: number };

export const BlockedList = ({ gameId }: Props) => {
  const { data } = useSuspenseGamesCheerTalkBlock({ gameId, cursor: 1, size: 20 });

  return <CheerTalkList cheerTalks={data} status="blocked" />;
};
