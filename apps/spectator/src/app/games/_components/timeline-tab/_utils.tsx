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
    case 'REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'WARNING_CARD':
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
  if (record.type === 'REPLACEMENT' || record.type === 'BASKETBALL_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const getRecordSubtitle = (record: TimelineRecordType, sportType: SportType) => {
  switch (record.type) {
    case 'SCORE':
      if (sportType === 'BASKETBALL') {
        const score = record.scoreRecord.score;
        return score === 1 ? '자유투' : `${score}점슛`;
      }
      return '득점';
    case 'REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return `${record.playerName} OUT`;
    case 'WARNING_CARD':
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
