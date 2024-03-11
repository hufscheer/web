import dayjs, { locale } from 'dayjs';
import 'dayjs/locale/ko';

locale('ko');

export const formatTime = (time: string | Date, format: string) => {
  return dayjs(time).format(format);
};
