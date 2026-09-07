import { BasketballIcon, FoulIcon, TradeHorizontalIcon } from '@hcc/icons';

import type { ProgressType, TimelineRecordType } from '~/api';

export const getRecordIcon = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      return <BasketballIcon size={16} />;
    case 'BASKETBALL_REPLACEMENT':
      return <TradeHorizontalIcon size={16} />;
    case 'FOUL':
      return <FoulIcon size={16} />;
    default:
      return null;
  }
};

export const getRecordTitle = (record: TimelineRecordType) => {
  if (record.type === 'BASKETBALL_REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }

  return record.playerName;
};

export const getRecordSubtitle = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE': {
      const score = record.scoreRecord.score;
      if (score === 1) return '자유투';
      return record.scoreRecord.assistPlayerName
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
