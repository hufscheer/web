import { FoulIcon, SportsAndOutdoorsIcon, TradeHorizontalIcon } from '@hcc/icons';

import type { ProgressType, TimelineRecordType } from '~/api';

import { cn } from '~/utils/cn';

export const getRecordIcon = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      return (
        <SportsAndOutdoorsIcon
          size={16}
          className={record.ownGoalRecord ? 'text-[var(--color-danger-600)]' : undefined}
        />
      );
    case 'OWN_GOAL':
      return <SportsAndOutdoorsIcon size={16} className="text-[var(--color-danger-600)]" />;
    case 'SOCCER_REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'WARNING_CARD':
      return (
        <div
          className={cn(
            'h-4 w-3 rounded-sm',
            record.warningCardRecord?.warningCardType === 'YELLOW'
              ? 'bg-[var(--color-yellow-400)]'
              : 'bg-[var(--color-danger-600)]',
          )}
        />
      );
    case 'FOUL':
      return <FoulIcon size={16} />;
    case 'PK':
      return (
        <SportsAndOutdoorsIcon
          size={16}
          className={
            record.pkRecord.isSuccess
              ? 'text-[var(--color-green-600)]'
              : 'text-[var(--color-danger-600)]'
          }
        />
      );
    default:
      return null;
  }
};

export const getRecordTitle = (record: TimelineRecordType) => {
  if (record.type === 'SOCCER_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }

  return record.playerName;
};

const getWarningCardType = (record: TimelineRecordType) => {
  switch (record.warningCardRecord?.warningCardType) {
    case 'YELLOW':
      return '경고';
    case 'RED':
      return '퇴장';
    default:
      return '';
  }
};

export const getRecordSubtitle = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      if (record.ownGoalRecord) return '자책골';
      return record.scoreRecord.assistPlayerName
        ? `${record.scoreRecord.assistPlayerName} 도움`
        : '득점';
    case 'OWN_GOAL':
      return '자책골';
    case 'SOCCER_REPLACEMENT':
      return record.replacementRecord.isFoulOut
        ? `${record.playerName} 파울아웃`
        : `${record.playerName} OUT`;
    case 'WARNING_CARD':
      return getWarningCardType(record);
    case 'FOUL':
      return;
    case 'PK':
      return record.pkRecord.isSuccess ? '성공' : '실축';
    default:
      return '';
  }
};

export const getProgressSemantics = (progressType: ProgressType): string => {
  switch (progressType) {
    case 'GAME_START':
      return '시작';
    case 'QUARTER_START':
      return '시작';
    case 'QUARTER_END':
      return '종료';
    case 'GAME_END':
      return '종료';
  }
};
