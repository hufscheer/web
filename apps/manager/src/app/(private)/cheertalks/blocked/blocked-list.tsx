'use client';

import { useSuspenseCheerTalkBlock } from '~/api';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

export const BlockedList = () => {
  const { data } = useSuspenseCheerTalkBlock({ cursor: 1, size: 5 });

  return <CheerTalkList cheerTalks={data} status="blocked" />;
};
