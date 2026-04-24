import { BasketballIcon, FoulIcon, SportsAndOutdoorsIcon, TradeHorizontalIcon } from '@hcc/icons';

import type { ProgressType, SportType, TimelineRecordType } from '~/api';

export const getRecordIcon = (record: TimelineRecordType, sportType: SportType) => {
  switch (record.type) {
    case 'SCORE':
      return sportType === 'BASKETBALL' ? (
        <BasketballIcon size={16} />
      ) : (
        <SportsAndOutdoorsIcon size={16} />
      );
    case 'SOCCER_REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'WARNING_CARD':
      if (sportType === 'BASKETBALL') {
        return;
      }

      return record.warningCardRecord?.warningCardType === 'YELLOW' ? (
        <div className="h-4 w-3 rounded-sm bg-[var(--color-yellow-400)]" />
      ) : (
        <div className="h-4 w-3 rounded-sm bg-[var(--color-danger-600)]" />
      );
    case 'FOUL':
      return <FoulIcon size={16} />;
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
  if (record.type === 'SOCCER_REPLACEMENT' || record.type === 'BASKETBALL_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

const getWarningCardType = (record: TimelineRecordType, sportType: SportType) => {
  if (sportType === 'BASKETBALL') {
    return;
  }

  switch (record.warningCardRecord?.warningCardType) {
    case 'YELLOW':
      return '경고';
    case 'RED':
      return '퇴장';
    default:
      return '';
  }
};

export const getRecordSubtitle = (record: TimelineRecordType, sportType: SportType) => {
  switch (record.type) {
    case 'SCORE':
      if (sportType === 'BASKETBALL') {
        const score = record.scoreRecord.score;
        return score === 1 ? '자유투' : `${score}점슛`;
      }
      return record.scoreRecord.assistPlayerName
        ? `${record.scoreRecord.assistPlayerName} 도움`
        : '득점';
    case 'SOCCER_REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return record.replacementRecord.isFoulOut
        ? `${record.playerName} 파울아웃`
        : `${record.playerName} OUT`;
    case 'WARNING_CARD':
      return getWarningCardType(record, sportType);
    case 'FOUL':
      if (sportType === 'SOCCER') {
        return;
      }
      return '파울';
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
