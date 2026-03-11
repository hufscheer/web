import { formatTime } from '@hcc/toolkit';
import { colors, Typography } from '@hcc/ui';

import type { CheerTalkType } from '~/api';

type Props = {
  cheerTalk: CheerTalkType;
  lastAccessedAt: string;
};
const CheerTalkCard = ({ cheerTalk, lastAccessedAt }: Props) => {
  const cheerTalkDate = new Date(cheerTalk.createdAt);
  const lastAccessedDate = new Date(lastAccessedAt);

  const isUnread = cheerTalkDate > lastAccessedDate;
  return (
    <div className="flex w-[80%] flex-col gap-1 rounded-lg bg-neutral-50 px-3 py-2">
      <Typography fontSize={12} color={colors.neutral500} weight="medium" lineHeight="none" asChild>
        <time>
          {formatTime(cheerTalk.createdAt, { format: 'YYYY년 MM월 DD일 HH:mm', locale: 'ko' })}
        </time>
      </Typography>
      <Typography weight="medium" color={isUnread ? colors.neutral900 : colors.neutral500}>
        {cheerTalk.content}
      </Typography>
      <Typography fontSize={12} color={colors.neutral500} lineHeight="none">
        {cheerTalk.leagueName} - {cheerTalk.gameName}
      </Typography>
    </div>
  );
};

export default CheerTalkCard;
