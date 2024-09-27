import { TimelineRecordType } from '@hcc/api';
import { SoccerIcon, TradeHorizontalIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

export const getRecordIcon = (record: TimelineRecordType) => {
  switch (record.type) {
    case 'SCORE':
      return <Icon source={SoccerIcon} size={16} />;
    case 'REPLACEMENT':
      return <Icon source={TradeHorizontalIcon} size={16} />;
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
  if (record.type === 'SCORE') {
    return '득점';
  }
  if (record.type === 'REPLACEMENT') {
    return `${record.playerName} OUT`;
  }
  return '';
};
