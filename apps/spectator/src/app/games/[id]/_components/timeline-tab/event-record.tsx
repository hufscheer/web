import { colors, Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { TimelineRecordType } from '~/api';

import { getRecordIcon, getRecordSubtitle, getRecordTitle } from './_utils';

type Props = {
  record: TimelineRecordType;
  homeTeamId: number;
};

export const EventRecord = ({ record, homeTeamId }: Props) => {
  const isAway = record.gameTeamId !== homeTeamId;

  return (
    <div className={twMerge('center-y relative gap-4 py-2', isAway && 'flex-row-reverse')}>
      <div className="h-full w-[3px] bg-neutral-950" aria-hidden />
      <Typography
        className="center size-10 rounded-full border border-neutral-50"
        fontSize={14}
        color={colors.neutral500}
        weight="medium"
        lineHeight="none"
      >
        {record.type === 'PK' ? 'P.S' : `${record.recordedAt}'`}
      </Typography>
      {getRecordIcon(record)}
      <div className="column gap-1">
        <Typography color={colors.neutral900} fontSize={14} weight="medium" lineHeight="none">
          {getRecordTitle(record)}
        </Typography>
        <Typography color={colors.neutral500} fontSize={12} weight="medium" lineHeight="none">
          {getRecordSubtitle(record)}
        </Typography>
      </div>
      <div
        className={twMerge(
          isAway && 'absolute top-0 right-0 h-full w-[3px] bg-neutral-950',
          !isAway && 'absolute top-0 left-0 h-full w-[3px] bg-neutral-950',
        )}
        aria-hidden
      />
    </div>
  );
};
