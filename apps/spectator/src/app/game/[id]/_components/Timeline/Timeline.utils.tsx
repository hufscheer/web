import { ProgressType, TimelineRecordType } from '@hcc/api';
import { SoccerIcon, TradeHorizontalIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

export const getRecordIcon = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      return <Icon source={SoccerIcon} size={16} />;
    case 'REPLACEMENT':
      return <Icon source={TradeHorizontalIcon} size={16} />;
    case 'PK':
      return record.pkRecord.isSuccess ? (
        <Icon source={SoccerIcon} size={16} color="green" />
      ) : (
        <Icon source={SoccerIcon} size={16} color="red" />
      );
    default:
      return null;
  }
};

export const getRecordTitle = (record: TimelineRecordType) => {
  if (record.type === 'REPLACEMENT') {
    return `${record.replacementRecord.replacedPlayerName} IN`;
  }
  return record.playerName;
};

export const getRecordSubtitle = (record: TimelineRecordType) => {
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
