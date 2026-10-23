import type { ComponentProps } from 'react';

import { colors, Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { TimelineRecord } from '~/api';

import { TimelineRecordDeleteButton } from './timeline-delete';

type Props = ComponentProps<'div'> & {
  showDividerLine?: boolean;
  deleteRecord?: { gameId: number; record: TimelineRecord };
};

export const TextRecord = ({
  showDividerLine = false,
  deleteRecord,
  className,
  children,
  ...props
}: Props) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between gap-2.5 px-4 py-2',
        className,
        !showDividerLine && 'justify-center',
        deleteRecord && 'pr-0',
      )}
      {...props}
    >
      {showDividerLine && <div className="h-px w-full flex-1 bg-neutral-50" aria-hidden />}
      <Typography className="text-center" color={colors.neutral500} fontSize={12} weight="medium">
        {children}
      </Typography>
      {showDividerLine && <div className="h-px w-full flex-1 bg-neutral-50" aria-hidden />}
      {deleteRecord && <TimelineRecordDeleteButton {...deleteRecord} className="ml-0" />}
    </div>
  );
};
