import dayjs, { locale } from 'dayjs';
import 'dayjs/locale/ko';

locale('ko');

export const formatTime = (
  time: string | Date,
  format: string,
  locale = 'ko',
) => {
  return dayjs(time).locale(locale).format(format);
};
