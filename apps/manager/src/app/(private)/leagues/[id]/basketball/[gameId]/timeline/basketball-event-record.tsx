import { BasketballIcon, FoulIcon, TradeHorizontalIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { TimelineRecordTypeBySport } from '~/api';

import { TimelineRecordDeleteButton } from '../../../_components/timeline/timeline-delete';

type Props = {
  record: TimelineRecordTypeBySport<'BASKETBALL'>;
  homeTeamId: number;
  gameId: number;
};

const getBasketballIcon = (record: TimelineRecordTypeBySport<'BASKETBALL'>) => {
  switch (record.type) {
    case 'SCORE':
      return <BasketballIcon size={16} />;
    case 'BASKETBALL_REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'FOUL':
      return <FoulIcon size={16} />;
  }
};

const getBasketballSubtitle = (record: TimelineRecordTypeBySport<'BASKETBALL'>) => {
  switch (record.type) {
    case 'SCORE': {
      const score = record.scoreRecord?.score;
      if (score === 1) return '자유투';
      return record.scoreRecord?.assistPlayerName
        ? `${score}점슛 ${record.scoreRecord.assistPlayerName} 도움`
        : `${score}점슛`;
    }
    case 'BASKETBALL_REPLACEMENT':
      return record.replacementRecord.isFoulOut
        ? `${record.playerName} 파울아웃`
        : `${record.playerName} OUT`;
    case 'FOUL':
      return '파울';
    default:
      return '';
  }
};

const getBasketballTitle = (record: TimelineRecordTypeBySport<'BASKETBALL'>): string => {
  if (record.type === 'BASKETBALL_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const BasketballEventRecord = ({ record, homeTeamId, gameId }: Props) => {
  const isAway = record.gameTeamId !== homeTeamId;

  return (
    <div className="flex w-full items-center">
      <div
        className={twMerge(
          'relative flex min-w-0 flex-1 items-center gap-4 py-2',
          isAway && 'flex-row-reverse',
        )}
      >
        <div className="h-full w-[3px] bg-neutral-950" aria-hidden />
        <Typography
          className="center h-10 w-0 rounded-full border border-neutral-50"
          fontSize={14}
          color={colors.neutral500}
          weight="medium"
          lineHeight="none"
        />
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
      <TimelineRecordDeleteButton gameId={gameId} record={record} />
    </div>
  );
};
