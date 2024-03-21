import { LowerRecordType } from '@/types/game';

export type RecordMapType = { [key in LowerRecordType]: string };
export const recordMap: RecordMapType = {
  score: '득점',
  replacement: '교체',
};
