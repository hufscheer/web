import { ErrorFillIcon, ErrorIcon, SportsAndOutdoorsIcon, TradeHorizontalIcon } from '@hcc/icons';
import type { ProgressType, TimelineRecordType } from '~/api';

export const getRecordIcon = (record: TimelineRecordType) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card === 'YELLOW') {
    return <ErrorIcon size={16} className="text-[var(--color-yellow-500)]" />;
  }
  if (card === 'RED') {
    return <ErrorFillIcon size={16} className="text-[var(--color-danger-600)]" />;
  }
  switch (record.type) {
    case 'SCORE':
      return <SportsAndOutdoorsIcon size={16} />;
    case 'REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'PK':
      return record.pkRecord.isSuccess ? (
        <SportsAndOutdoorsIcon size={16} className="text-[var(--color-green-600)]" />
      ) : (
        <SportsAndOutdoorsIcon size={16} className="text-[var(--color-danger-600)]" />
      );
    default:
      return null;
  }
};

export const getRecordTitle = (record: TimelineRecordType) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card) {
    return record.playerName;
  }
  if (record.type === 'REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const getRecordSubtitle = (record: TimelineRecordType) => {
  const card = record.warningCardRecord?.warningCardType;
  if (card === 'YELLOW') return '경고';
  if (card === 'RED') return '퇴장';
  switch (record.type) {
    case 'SCORE':
      return '득점';
    case 'REPLACEMENT':
      return `${record.playerName} OUT`;
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
