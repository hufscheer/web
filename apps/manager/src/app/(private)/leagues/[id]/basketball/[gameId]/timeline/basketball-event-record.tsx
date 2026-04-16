import { SportsAndOutdoorsIcon, TradeHorizontalIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { TimelineRecordType } from '~/api';

type Props = {
  record: TimelineRecordType;
  homeTeamId: number;
};

const getBasketballIcon = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      return <SportsAndOutdoorsIcon size={16} />;
    case 'REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'WARNING_CARD':
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-[10px] font-bold text-white">
          F
        </div>
      );
    default:
      return null;
  }
};

const getBasketballSubtitle = (record: TimelineRecordType): string => {
  switch (record.type) {
    case 'SCORE': {
      const score = record.scoreRecord?.[0]?.score;
      if (score === 3) return '3점슛';
      if (score === 1) return '자유투';
      return '2점슛';
    }
    case 'REPLACEMENT':
      return `${record.playerName} OUT`;
    case 'WARNING_CARD':
      return '파울';
    default:
      return '';
  }
};

const getBasketballTitle = (record: TimelineRecordType): string => {
  if (record.type === 'REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const BasketballEventRecord = ({ record, homeTeamId }: Props) => {
  const isAway = record.gameTeamId !== homeTeamId;

  return (
    <div
      className={twMerge(
        'relative flex w-full items-center gap-4 py-2',
        isAway && 'flex-row-reverse',
      )}
    >
      <div className="h-full w-[3px] bg-neutral-950" aria-hidden />
      <Typography
        className="center size-10 rounded-full border border-neutral-50"
        fontSize={14}
        color={colors.neutral500}
        weight="medium"
        lineHeight="none"
      >
        {`${record.recordedAt}'`}
      </Typography>
      {getBasketballIcon(record)}
      <div className="column gap-1">
        <Typography color={colors.neutral900} fontSize={14} weight="medium" lineHeight="none">
          {getBasketballTitle(record)}
        </Typography>
        <Typography color={colors.neutral500} fontSize={12} weight="medium" lineHeight="none">
          {getBasketballSubtitle(record)}
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
