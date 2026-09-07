import { SportsAndOutdoorsIcon, TradeHorizontalIcon } from '@hcc/icons';
import { twMerge } from 'tailwind-merge';

import type { ProgressType, TimelineRecordTypeBySport } from '~/api';

export const getRecordIcon = (record: TimelineRecordTypeBySport<'SOCCER'>) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card === 'YELLOW') {
    return (
      <div
        className={twMerge(
          'inline-flex h-5 w-3.5 items-center justify-center rounded-sm px-1 py-0.5',
          'bg-[var(--color-yellow-500)]',
        )}
      />
    );
  }
  if (card === 'RED') {
    return (
      <div
        className={twMerge(
          'inline-flex h-5 w-3.5 items-center justify-center rounded-sm px-1 py-0.5',
          'bg-[var(--color-danger-600)]',
        )}
      />
    );
  }
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
    case 'PK':
      return record.pkRecord.isSuccess ? (
        <SportsAndOutdoorsIcon size={16} className="text-[var(--color-green-600)]" />
      ) : (
        <SportsAndOutdoorsIcon size={16} className="text-[var(--color-danger-600)]" />
      );
    case 'GAME_PROGRESS':
      return null;
    case 'WARNING_CARD':
      return null;
  }
};

export const getRecordTitle = (record: TimelineRecordTypeBySport<'SOCCER'>) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card) {
    return record.playerName;
  }
  if (record.type === 'SOCCER_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const getRecordSubtitle = (record: TimelineRecordTypeBySport<'SOCCER'>) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card === 'YELLOW') return '경고';
  if (card === 'RED') return '퇴장';
  switch (record.type) {
    case 'SCORE':
      if (record.ownGoalRecord) return '자책골';
      return record.scoreRecord.assistPlayerName
        ? `${record.scoreRecord.assistPlayerName} 도움`
        : '득점';
    case 'OWN_GOAL':
      return '자책골';
    case 'SOCCER_REPLACEMENT':
      return `${record.playerName} OUT`;
    case 'PK':
      return record.pkRecord.isSuccess ? '성공' : '실축';
    case 'GAME_PROGRESS':
      return '';
    case 'WARNING_CARD':
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
